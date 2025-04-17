/// Command handlers for the Tauri application
pub mod commands;

/// Error handling definitions
pub mod error;

/// Application state management
pub mod state;

/// Service implementations for core functionality
pub mod services;

pub use error::{AppError, AppResult};
pub use services::storage::LocalStorage;
pub use state::AppState; 