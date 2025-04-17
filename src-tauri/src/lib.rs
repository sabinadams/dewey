/// Command handlers for the Tauri application
pub mod commands;

/// Error handling definitions
pub mod error;

/// Storage implementation for data persistence
pub mod storage;

pub use error::{AppError, AppResult};
pub use storage::LocalStorage;

use sqlx::SqlitePool;
use std::sync::Arc;

/// Global application state that can be shared with Tauri command handlers
/// 
/// This struct contains all dependencies that need to be accessed
/// by command handlers. It is managed by Tauri and injected into commands.
#[derive(Debug)]
pub struct AppState {
    /// Database connection pool
    pub db: Arc<SqlitePool>,
} 