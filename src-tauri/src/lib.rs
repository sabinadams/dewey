//! Dewey library for the Tauri application.
//! 
//! This library provides the core functionality for the Dewey application,
//! including command handlers, error handling, state management, and services.

/// Command handlers for the Tauri application
pub mod commands;

/// Error handling definitions
pub mod error;

/// Error handling subcategories
pub mod error_subcategories;

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

/// Re-export of the main error type
pub use error::AppError;

/// Re-export of the result type alias
pub use types::AppResult;

/// Re-export of the local storage service
pub use services::storage::LocalStorage;

/// Re-export of the application state
pub use state::AppState;

/// Re-export of all constants
pub use constants::*;