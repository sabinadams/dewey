use sqlx::SqlitePool;
use std::sync::Arc;
use std::path::PathBuf;

use crate::error::AppError;
use crate::services::storage::LocalStorage;

use tracing::{info, error};
use directories::ProjectDirs;

/// Global application state that can be shared with Tauri command handlers
/// 
/// This struct contains all dependencies that need to be accessed
/// by command handlers. It is managed by Tauri and injected into commands.
#[derive(Debug)]
pub struct AppState {
    /// Database connection pool
    pub db: Arc<SqlitePool>,
}

/// Get the application data directory
pub fn get_app_dir() -> Result<PathBuf, AppError> {
    ProjectDirs::from("com", "dewey", "app")
        .ok_or_else(|| AppError::Config("Failed to get app data directory".into()))
        .map(|dirs| dirs.data_dir().to_path_buf())
}

/// Initialize the application state by setting up the database
pub async fn initialize_app_state() -> Result<AppState, AppError> {
    // Get app directory
    let app_dir = get_app_dir()?;
    
    // Ensure app directory exists
    std::fs::create_dir_all(&app_dir)
        .map_err(|e| {
            error!("Failed to create application directory: {}", e);
            AppError::Io(e)
        })?;

    // Set up database
    let db_path = app_dir.join("dewey.db");
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
