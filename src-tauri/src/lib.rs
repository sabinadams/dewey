/// Command handlers for the Tauri application
pub mod commands;

/// Error handling definitions
pub mod error;

/// Common types used throughout the application
pub mod types;

/// Application state management
pub mod state;

/// Service implementations for core functionality
pub mod services;

/// Global constants
pub mod constants;

/// Custom protocol handlers for the application
pub mod protocols;

/// Utility functions
pub mod utils;

pub use error::AppError;
pub use types::AppResult;
pub use services::storage::LocalStorage;
pub use state::AppState;
pub use constants::*;