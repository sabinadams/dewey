use crate::error::AppResult;
use sqlx::sqlite::{SqliteConnectOptions, SqlitePool};
use std::path::{Path, PathBuf};
use std::sync::Arc;
use std::str::FromStr;
use tracing::info;
use std::sync::OnceLock;

pub mod repositories;
pub mod icon;

static APP_DIR: OnceLock<PathBuf> = OnceLock::new();

pub struct LocalStorage {
    pool: Arc<SqlitePool>,
    app_dir: PathBuf,
}

impl LocalStorage {
    pub async fn new<P: AsRef<Path>>(path: P, app_dir: PathBuf) -> AppResult<Self> {
        // Store the app directory globally
        APP_DIR.get_or_init(|| app_dir.clone());

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
        sqlx::migrate!().run(&pool).await?;
        info!("Migrations completed successfully");
        
        Ok(Self {
            pool: Arc::new(pool),
            app_dir,
        })
    }

    pub fn pool(&self) -> Arc<SqlitePool> {
        self.pool.clone()
    }

    pub fn app_dir(&self) -> &PathBuf {
        &self.app_dir
    }

    pub fn get_app_dir() -> &'static PathBuf {
        APP_DIR.get().expect("App directory not initialized")
    }
} 