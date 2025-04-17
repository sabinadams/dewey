use sqlx::SqlitePool;
use std::sync::Arc;

use crate::error::AppError;
use crate::services::storage::LocalStorage;
use crate::utils;
use crate::constants;

use tracing::{info, error};

/// Global application state that can be shared with Tauri command handlers
/// 
/// This struct contains all dependencies that need to be accessed
/// by command handlers. It is managed by Tauri and injected into commands.
#[derive(Debug)]
pub struct AppState {
    /// Database connection pool
    pub db: Arc<SqlitePool>,
}

/// Initialize the application state by setting up the database
pub async fn initialize_app_state() -> Result<AppState, AppError> {
    // Get app directory
    let app_dir = utils::get_app_dir()?;
    
    // Ensure app directory exists
    utils::ensure_dir_exists(&app_dir)
        .map_err(|e| {
            error!("Failed to create application directory: {}", e);
            e
        })?;

    // Set up database
    let db_path = app_dir.join(constants::DB_FILENAME);
    info!("Using database at: {:?}", db_path);
    
    let storage = LocalStorage::new(&db_path, app_dir).await
        .map_err(|e| {
            error!("Failed to initialize database: {}", e);
            e
        })?;

    // Create app state for dependency injection
    Ok(AppState {
        db: storage.pool(),
    })
}
