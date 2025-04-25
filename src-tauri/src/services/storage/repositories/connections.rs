use crate::types::AppResult;
use crate::services::encryption::encrypt_string;
use serde::{Deserialize, Serialize};
use sqlx::{FromRow, Row, SqlitePool};
use std::sync::Arc;
use tracing::debug;
use crate::error::{AppError, ErrorSeverity};
use crate::error::categories::{DatabaseSubcategory, ErrorCategory};

/// Represents a database connection in the application
#[derive(Debug, Serialize, Deserialize, FromRow)]
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
    
    pub async fn create(&self, connection: &NewConnection) -> AppResult<i64> {
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
        .fetch_one(&*self.pool)
        .await?;
        
        let id = result.get(0);
        debug!("Created connection with ID: {}", id);
        Ok(id)
    }

    pub async fn get_by_project(&self, project_id: i64) -> AppResult<Vec<Connection>> {
        debug!("Fetching connections for project: {}", project_id);
        
        let connections = sqlx::query_as::<_, Connection>(
            r"
            SELECT id, project_id, connection_name, db_type, host, port, username, password, database, created_at, updated_at
            FROM connections
            WHERE project_id = ?
            ORDER BY created_at ASC
            "
        )
        .bind(project_id)
        .fetch_all(&*self.pool)
        .await
        .map_err(|e| AppError::new(
            e.to_string(),
            ErrorCategory::Database(DatabaseSubcategory::QueryFailed),
            ErrorSeverity::Error,
        ))?;

        debug!("Found {} connections", connections.len());
        Ok(connections)
    }
}