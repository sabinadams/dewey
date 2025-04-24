use crate::types::AppResult;
use crate::constants;
use crate::utils;
use crate::error::ErrorCategory;

use sqlx::sqlite::{SqliteConnectOptions, SqlitePool};
use std::path::{Path, PathBuf};
use std::sync::Arc;
use std::str::FromStr;
use tracing::{info, debug};
use std::sync::OnceLock;

pub mod repositories;
pub mod icon;

/// Global storage of the application directory path for access from any context
static APP_DIR: OnceLock<PathBuf> = OnceLock::new();

/// Main storage manager for the application
/// 
/// Handles database connections and provides access to
/// the application's data storage directory
pub struct LocalStorage {
    pool: Arc<SqlitePool>,
    app_dir: PathBuf,
}

impl LocalStorage {
    /// Create a new `LocalStorage` instance
    /// 
    /// # Arguments
    /// * `path` - The path to the `SQLite` database file
    /// * `app_dir` - The application's data directory
    /// 
    /// # Returns
    /// A Result containing the `LocalStorage` or an error
    ///
    /// # Errors
    /// Returns an error if:
    /// - The database directory could not be created
    /// - The database connection could not be established
    /// - The database migrations failed to run
    pub async fn new<P: AsRef<Path>>(path: P, app_dir: PathBuf) -> AppResult<Self> {
        // Store the app directory globally
        APP_DIR.get_or_init(|| app_dir.clone());
        debug!("Set application directory to: {:?}", app_dir);

        // Ensure parent directory exists
        if let Some(parent) = path.as_ref().parent() {
            utils::ensure_dir_exists(&parent.to_path_buf())?;
            debug!("Created directory: {:?}", parent);
        }

        // Configure and connect to the SQLite database
        let db_path_str = format!("{}{}", constants::SQLITE_URI_PREFIX, path.as_ref().display());
        debug!("Connecting to database at: {}", db_path_str);
        
        let options = SqliteConnectOptions::from_str(&db_path_str)?
            .create_if_missing(true)
            .journal_mode(constants::DEFAULT_JOURNAL_MODE)
            .foreign_keys(true);

        let pool = SqlitePool::connect_with(options).await?;
        
        // Run migrations
        info!("Connected to database - running migrations");
        sqlx::migrate!().run(&pool).await.map_err(|e| ErrorCategory::Migration {
            message: e.to_string(),
        })?;
        info!("Migrations completed successfully");
        
        Ok(Self {
            pool: Arc::new(pool),
            app_dir,
        })
    }

    /// Get a reference to the database connection pool
    #[must_use]
    pub fn pool(&self) -> Arc<SqlitePool> {
        self.pool.clone()
    }

    /// Get the application's data directory
    #[must_use]
    pub const fn app_dir(&self) -> &PathBuf {
        &self.app_dir
    }

    /// Get the application's data directory from anywhere in the application
    /// 
    /// This is available after `LocalStorage` has been initialized
    ///
    /// # Panics
    /// Panics if called before `LocalStorage` has been initialized
    #[must_use]
    pub fn get_app_dir() -> &'static PathBuf {
        APP_DIR.get().expect(constants::APP_DIR_NOT_INITIALIZED)
    }
} 