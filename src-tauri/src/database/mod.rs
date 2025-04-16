use crate::error::AppResult;
use async_trait::async_trait;
use serde::{Deserialize, Serialize};

mod sqlite;
pub use sqlite::SqliteDatabase;

#[derive(Debug, Serialize, Deserialize)]
pub enum DatabaseType {
    Sqlite,
    Postgres,  // For future implementation
    MySQL,     // For future implementation
}

#[derive(Debug, Serialize, Deserialize)]
pub struct DatabaseConfig {
    pub db_type: DatabaseType,
    pub connection_string: String,
    pub name: String,
}

#[async_trait]
pub trait DatabaseConnection: Send + Sync {
    async fn connect(&self) -> AppResult<()>;
    async fn disconnect(&self) -> AppResult<()>;
    async fn test_connection(&self) -> AppResult<bool>;
}

#[async_trait]
pub trait QueryExecutor: Send + Sync {
    async fn execute_query(&self, query: &str) -> AppResult<Vec<serde_json::Value>>;
    async fn explain_query(&self, query: &str) -> AppResult<String>;
}

#[async_trait]
pub trait SchemaIntrospection: Send + Sync {
    async fn get_tables(&self) -> AppResult<Vec<String>>;
    async fn get_columns(&self, table: &str) -> AppResult<Vec<ColumnInfo>>;
    async fn get_relationships(&self) -> AppResult<Vec<Relationship>>;
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ColumnInfo {
    pub name: String,
    pub data_type: String,
    pub is_nullable: bool,
    pub is_primary: bool,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Relationship {
    pub table_from: String,
    pub column_from: String,
    pub table_to: String,
    pub column_to: String,
    pub relationship_type: RelationType,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum RelationType {
    OneToOne,
    OneToMany,
    ManyToOne,
    ManyToMany,
} 