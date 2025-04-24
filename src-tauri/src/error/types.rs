use serde::{Serialize, Deserialize};
use crate::error::ErrorCategory;

/// Severity levels for errors
/// 
/// This enum defines the severity levels that can be assigned to errors in the application.
/// The severity level helps determine how errors should be handled and displayed to users.
#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub enum ErrorSeverity {
    /// Informational messages that don't indicate an error
    Info,
    /// Warning messages that indicate potential issues
    Warning,
    /// Error messages that indicate a problem that needs attention
    Error,
    /// Critical error messages that indicate a serious problem
    Critical,
}

/// Main error type for the application
pub type AppError = ErrorCategory; 