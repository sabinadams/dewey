use crate::error::{AppError, AppResult};
use sqlx::{migrate::MigrateError, sqlite::SqlitePool, Pool, Sqlite};
use std::path::Path;
use std::sync::Arc;

pub mod repositories;

pub struct LocalStorage {
    pool: Arc<Pool<Sqlite>>,
}

impl LocalStorage {
    pub async fn new<P: AsRef<Path>>(path: P) -> AppResult<Self> {
        let database_url = format!("sqlite:{}", path.as_ref().to_string_lossy());
        let pool = SqlitePool::connect(&database_url).await?;
        
        // Run migrations
        sqlx::migrate!("./migrations")
            .run(&pool)
            .await
            .map_err(|e: MigrateError| AppError::Config(e.to_string()))?;
        
        Ok(Self {
            pool: Arc::new(pool),
        })
    }

    pub fn pool(&self) -> Arc<Pool<Sqlite>> {
        self.pool.clone()
    }
} 