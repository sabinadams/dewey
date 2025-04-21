use crate::types::AppResult;
use crate::services::encryption::{encrypt_string, decrypt_string};
use serde::{Deserialize, Serialize};
use sqlx::{FromRow, Row, SqlitePool};
use std::sync::Arc;
use tracing::debug;

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

#[derive(Debug, FromRow)]
struct EncryptedConnection {
    pub id: i64,
    pub connection_name: String,
    pub project_id: i64,
    pub db_type: String,
    pub encrypted_host: String,
    pub encrypted_port: String,
    pub encrypted_username: String,
    pub encrypted_password: String,
    pub encrypted_database: String,
    pub created_at: Option<i64>,
    pub updated_at: Option<i64>,
}

impl From<EncryptedConnection> for Connection {
    fn from(ec: EncryptedConnection) -> Self {
        Self {
            id: ec.id,
            connection_name: ec.connection_name,
            project_id: ec.project_id,
            db_type: ec.db_type,
            host: decrypt_string(&ec.encrypted_host).unwrap_or_default(),
            port: decrypt_string(&ec.encrypted_port).unwrap_or_default(),
            username: decrypt_string(&ec.encrypted_username).unwrap_or_default(),
            password: decrypt_string(&ec.encrypted_password).unwrap_or_default(),
            database: decrypt_string(&ec.encrypted_database).unwrap_or_default(),
            created_at: ec.created_at,
            updated_at: ec.updated_at,
        }
    }
}

pub struct ConnectionRepository {
    pool: Arc<SqlitePool>,
}

impl ConnectionRepository {
    pub fn new(pool: Arc<SqlitePool>) -> Self {
        Self { pool }
    }
    
    pub async fn create(&self, connection: &Connection) -> AppResult<i64> {
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
        .bind(&connection.project_id)
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

    pub async fn get_by_id(&self, id: i64) -> AppResult<Option<Connection>> {
        let connection = sqlx::query_as::<_, EncryptedConnection>(
            r#"
            SELECT * FROM connections WHERE id = ?
            "#
        )
        .bind(id)
        .fetch_optional(&*self.pool)
        .await?;

        Ok(connection.map(Connection::from))
    }

    pub async fn get_all(&self) -> AppResult<Vec<Connection>> {
        let connections = sqlx::query_as::<_, EncryptedConnection>(
            r#"
            SELECT * FROM connections
            "#
        )
        .fetch_all(&*self.pool)
        .await?;

        Ok(connections.into_iter().map(Connection::from).collect())
    }
}