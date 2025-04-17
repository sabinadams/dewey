/// Command handlers for the Tauri application
pub mod commands;

/// Error handling definitions
pub mod error;

/// Storage implementation for data persistence
pub mod storage;

/// Application state management
pub mod state;

pub use error::{AppError, AppResult};
pub use storage::LocalStorage;
pub use state::AppState; 