use crate::types::AppResult;
use crate::services::encryption::{decrypt_string, encrypt_string};
use serde::{Deserialize, Serialize};
use sqlx::{FromRow, Row, SqlitePool, Transaction};
use std::sync::Arc;
use tracing::debug;
use crate::error::{AppError, AppResult as ErrorAppResult, ErrorSeverity};
use crate::error::categories::{
    DatabaseSubcategory, EncryptionSubcategory, ErrorCategory,
};

/// Matches the `connections` table (encrypted credential columns per migration).
#[derive(Debug, FromRow)]
struct ConnectionRow {
    id: i64,
    connection_name: String,
    project_id: i64,
    db_type: String,
    encrypted_host: Vec<u8>,
    encrypted_port: Vec<u8>,
    encrypted_username: Vec<u8>,
    encrypted_password: Vec<u8>,
    encrypted_database: Option<Vec<u8>>,
    created_at: i64,
    updated_at: i64,
}

fn decrypt_blob_field(label: &str, blob: &[u8]) -> ErrorAppResult<String> {
    let s = std::str::from_utf8(blob).map_err(|e| {
        AppError::new(
            format!("{label} is not valid UTF-8: {e}"),
            ErrorCategory::Encryption(EncryptionSubcategory::Utf8DecodeFailed),
            ErrorSeverity::Error,
        )
    })?;
    decrypt_string(s)
}

/// Represents a database connection in the application (decrypted for API use).
#[derive(Debug, Serialize, Deserialize)]
pub struct Connection {
    pub id: i64,
    pub connection_name: String,
    pub project_id: i64,
    pub db_type: String,
    pub host: String,
    pub port: String,
    pub username: String,
    pub password: String,
    pub database: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub created_at: Option<i64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub updated_at: Option<i64>,
}

/// Represents a new database connection to be created
#[derive(Debug, Serialize, Deserialize)]
pub struct NewConnection {
    pub connection_name: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub project_id: Option<i64>,
    pub db_type: String,
    pub host: String,
    pub port: String,
    pub username: String,
    pub password: String,
    pub database: String,
}

pub struct ConnectionRepository {
    pool: Arc<SqlitePool>,
}

impl ConnectionRepository {
    pub fn new(pool: Arc<SqlitePool>) -> Self {
        Self { pool }
    }
    
    pub async fn create(
        &self,
        connection: &NewConnection,
        tx: Option<&mut Transaction<'_, sqlx::Sqlite>>,
    ) -> AppResult<i64> {
        debug!("Creating new connection: {:?}", connection);
        
        let query = sqlx::query(
            r#"
            INSERT INTO connections (
                connection_name, project_id, db_type, 
                encrypted_host, encrypted_port, encrypted_username, 
                encrypted_password, encrypted_database
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            RETURNING id
            "#
        )
        .bind(&connection.connection_name)
        .bind(connection.project_id.expect("project_id is required for database insertion"))
        .bind(&connection.db_type)
        .bind(encrypt_string(&connection.host)?)
        .bind(encrypt_string(&connection.port)?)
        .bind(encrypt_string(&connection.username)?)
        .bind(encrypt_string(&connection.password)?)
        .bind(encrypt_string(&connection.database)?);

        let result = if let Some(tx) = tx {
            query.fetch_one(&mut **tx).await
        } else {
            query.fetch_one(&*self.pool).await
        }?;
        
        let id = result.get(0);
        debug!("Created connection with ID: {}", id);
        Ok(id)
    }

    pub async fn get_by_project(&self, project_id: i64) -> AppResult<Vec<Connection>> {
        debug!("Fetching connections for project: {}", project_id);

        let rows = sqlx::query_as::<_, ConnectionRow>(
            r#"
            SELECT
                id,
                connection_name,
                project_id,
                db_type,
                encrypted_host,
                encrypted_port,
                encrypted_username,
                encrypted_password,
                encrypted_database,
                created_at,
                updated_at
            FROM connections
            WHERE project_id = ?
            ORDER BY created_at ASC
            "#,
        )
        .bind(project_id)
        .fetch_all(&*self.pool)
        .await
        .map_err(|e| {
            AppError::new(
                e.to_string(),
                ErrorCategory::Database(DatabaseSubcategory::QueryFailed),
                ErrorSeverity::Error,
            )
        })?;

        let mut connections = Vec::with_capacity(rows.len());
        for row in rows {
            let database = match row.encrypted_database.as_deref() {
                Some(blob) if !blob.is_empty() => decrypt_blob_field("encrypted_database", blob)?,
                _ => String::new(),
            };
            connections.push(Connection {
                id: row.id,
                connection_name: row.connection_name,
                project_id: row.project_id,
                db_type: row.db_type,
                host: decrypt_blob_field("encrypted_host", &row.encrypted_host)?,
                port: decrypt_blob_field("encrypted_port", &row.encrypted_port)?,
                username: decrypt_blob_field("encrypted_username", &row.encrypted_username)?,
                password: decrypt_blob_field("encrypted_password", &row.encrypted_password)?,
                database,
                created_at: Some(row.created_at),
                updated_at: Some(row.updated_at),
            });
        }

        debug!("Found {} connections", connections.len());
        Ok(connections)
    }

    pub async fn create_with_transaction(
        &self,
        connection: &NewConnection,
        tx: &mut Transaction<'_, sqlx::Sqlite>,
    ) -> AppResult<i64> {
        debug!("Creating new connection: {:?}", connection);
        
        let result = sqlx::query(
            r#"
            INSERT INTO connections (
                connection_name, project_id, db_type, 
                encrypted_host, encrypted_port, encrypted_username, 
                encrypted_password, encrypted_database
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            RETURNING id
            "#
        )
        .bind(&connection.connection_name)
        .bind(connection.project_id.expect("project_id is required for database insertion"))
        .bind(&connection.db_type)
        .bind(encrypt_string(&connection.host)?)
        .bind(encrypt_string(&connection.port)?)
        .bind(encrypt_string(&connection.username)?)
        .bind(encrypt_string(&connection.password)?)
        .bind(encrypt_string(&connection.database)?)
        .fetch_one(&mut **tx)
        .await?;
        
        let id = result.get(0);
        debug!("Created connection with ID: {}", id);
        Ok(id)
    }
}