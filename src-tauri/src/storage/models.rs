use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Project {
    pub id: i64,
    pub name: String,
    pub description: Option<String>,
    pub user_id: String,
    pub created_at: i64,
    pub updated_at: i64,
}

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct SavedConnection {
    pub id: i64,
    pub name: String,
    pub connection_type: String,
    pub connection_string: String,
    pub last_used: i64,
}

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct QueryHistory {
    pub id: i64,
    pub connection_id: i64,
    pub query: String,
    pub timestamp: i64,
    pub execution_time_ms: i64,
}

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct UserSettings {
    pub id: i64,
    pub preferred_theme: String,
    pub max_query_history: i32,
    pub show_query_explanations: bool,
} 