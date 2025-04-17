use crate::error::AppResult;
use sqlx::sqlite::{SqliteConnectOptions, SqlitePool};
use std::path::Path;
use std::sync::Arc;
use std::str::FromStr;
use tracing::info;

pub mod repositories;
pub mod icon;

pub struct LocalStorage {
    pool: Arc<SqlitePool>,
}

impl LocalStorage {
    pub async fn new<P: AsRef<Path>>(path: P) -> AppResult<Self> {
        // Ensure parent directory exists
        if let Some(parent) = path.as_ref().parent() {
            std::fs::create_dir_all(parent)?;
            info!("Created directory: {:?}", parent);
        }

        let options = SqliteConnectOptions::from_str(&format!("sqlite://{}", path.as_ref().display()))?
            .create_if_missing(true)
            .journal_mode(sqlx::sqlite::SqliteJournalMode::Wal)
            .foreign_keys(true);

        let pool = SqlitePool::connect_with(options).await?;
        
        info!("Connected to database - running migrations");
        sqlx::migrate!("./migrations").run(&pool).await?;
        info!("Migrations completed successfully");
        
        Ok(Self {
            pool: Arc::new(pool),
        })
    }

    pub fn pool(&self) -> Arc<SqlitePool> {
        self.pool.clone()
    }
} 