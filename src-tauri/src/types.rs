use std::result::Result;
use crate::error::ErrorCategory;

/// Type alias for Result<T, ErrorCategory>
pub type AppResult<T> = Result<T, ErrorCategory>;

// Other types can be added here as needed 