//! Error handling system for the application.
//! 
//! This module provides a comprehensive error handling system that ensures consistent
//! error handling from backend to frontend. The system is organized into several
//! submodules:
//! 
//! - `types.rs`: Core error types and enums
//! - `categories.rs`: Error categories and subcategories
//! - `conversions.rs`: Error conversions and implementations
//! - `constructors.rs`: Convenience constructors for creating errors

pub mod types;
pub mod categories;
pub mod conversions;
pub mod constructors;

pub use types::{AppError, ErrorSeverity};
pub use categories::ErrorCategory;

// Type alias for Result using AppError
pub type AppResult<T> = Result<T, AppError>; 