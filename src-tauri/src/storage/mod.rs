use crate::error::AppResult;
use sqlx::SqlitePool;
use std::path::Path;
use std::sync::Arc;

pub mod repositories;

pub struct LocalStorage {
    pool: Arc<SqlitePool>,
}

impl LocalStorage {
    pub async fn new<P: AsRef<Path>>(path: P) -> AppResult<Self> {
        let database_url = format!("sqlite:{}", path.as_ref().to_string_lossy());
        let pool = SqlitePool::connect(&database_url).await?;
        
        // Ensure the database is initialized
        sqlx::query(
            r#"
            CREATE TABLE IF NOT EXISTS projects (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                user_id TEXT NOT NULL,
                created_at INTEGER NOT NULL DEFAULT (unixepoch()),
                updated_at INTEGER NOT NULL DEFAULT (unixepoch())
            )
            "#
        )
        .execute(&pool)
        .await?;
        
        Ok(Self {
            pool: Arc::new(pool),
        })
    }

    pub fn pool(&self) -> Arc<SqlitePool> {
        self.pool.clone()
    }
} 