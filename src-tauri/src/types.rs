//! Common type definitions used throughout the application.
//! 
//! This module contains type aliases and other type definitions that are used
//! across multiple modules in the application.

use std::result::Result;
use crate::error::ErrorCategory;

/// Type alias for Result<T, ErrorCategory>
pub type AppResult<T> = Result<T, ErrorCategory>;

// Other types can be added here as needed 