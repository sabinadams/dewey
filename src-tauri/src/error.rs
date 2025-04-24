use snafu::{Snafu, IntoError};
use std::error::Error as StdError;
use crate::services::encryption::EncryptionError;
use identicon_rs::error::IdenticonError;
use serde::Serialize;

/// Error categories for the application
#[derive(Debug, Snafu, Serialize)]
#[snafu(visibility(pub))]
pub enum ErrorCategory {
    #[snafu(display("Database error: {}", source))]
    Database { 
        #[serde(serialize_with = "serialize_error")]
        source: sqlx::Error 
    },

    #[snafu(display("Migration error: {}", message))]
    Migration { message: String },

    #[snafu(display("IO error: {}", source))]
    Io { 
        #[serde(serialize_with = "serialize_error")]
        source: std::io::Error 
    },

    #[snafu(display("Configuration error: {}", message))]
    Config { message: String },

    #[snafu(display("Icon generation error: {}", message))]
    IconGeneration { message: String },

    #[snafu(display("Image error: {}", source))]
    Image { 
        #[serde(serialize_with = "serialize_error")]
        source: image::ImageError 
    },

    #[snafu(display("File not found: {}", message))]
    FileNotFound { message: String },

    #[snafu(display("Keyring error: {}", message))]
    Keyring { message: String },

    #[snafu(display("Key generation error: {}", message))]
    KeyGeneration { message: String },

    #[snafu(display("Project error: {}", message))]
    Project { message: String },

    #[snafu(display("Project not found: {}", message))]
    ProjectNotFound { message: String },

    #[snafu(display("Icon error: {}", message))]
    Icon { message: String },

    #[snafu(display("Connection error: {}", message))]
    Connection { message: String },

    #[snafu(display("Validation error: {}", message))]
    Validation { message: String },

    #[snafu(display("Authentication error: {}", message))]
    Auth { message: String },

    #[snafu(display("Unknown error: {}", message))]
    Unknown { message: String },

    #[snafu(display("Encryption error: {}", message))]
    Encryption { message: String },
}

/// Main error type for the application
pub type AppError = ErrorCategory;

// Helper function to create error responses
pub fn create_error_response(error: AppError) -> serde_json::Value {
    serde_json::json!({
        "category": error.category_name(),
        "message": error.to_string()
    })
}

impl ErrorCategory {
    pub fn category_name(&self) -> &'static str {
        match self {
            ErrorCategory::Database { .. } => "DATABASE",
            ErrorCategory::Migration { .. } => "MIGRATION",
            ErrorCategory::Io { .. } => "IO",
            ErrorCategory::Config { .. } => "CONFIG",
            ErrorCategory::IconGeneration { .. } => "ICON_GENERATION",
            ErrorCategory::Image { .. } => "IMAGE",
            ErrorCategory::FileNotFound { .. } => "FILE_NOT_FOUND",
            ErrorCategory::Keyring { .. } => "KEYRING",
            ErrorCategory::KeyGeneration { .. } => "KEY_GENERATION",
            ErrorCategory::Project { .. } => "PROJECT",
            ErrorCategory::ProjectNotFound { .. } => "PROJECT_NOT_FOUND",
            ErrorCategory::Icon { .. } => "ICON",
            ErrorCategory::Connection { .. } => "CONNECTION",
            ErrorCategory::Validation { .. } => "VALIDATION",
            ErrorCategory::Auth { .. } => "AUTH",
            ErrorCategory::Unknown { .. } => "UNKNOWN",
            ErrorCategory::Encryption { .. } => "ENCRYPTION",
        }
    }
}

// Helper function to serialize errors
fn serialize_error<S, E>(error: &E, serializer: S) -> Result<S::Ok, S::Error>
where
    S: serde::Serializer,
    E: std::fmt::Display,
{
    serializer.serialize_str(&error.to_string())
}

// Implement From for various error types
impl From<sqlx::Error> for ErrorCategory {
    fn from(error: sqlx::Error) -> Self {
        ErrorCategory::Database { source: error }
    }
}

impl From<std::io::Error> for ErrorCategory {
    fn from(error: std::io::Error) -> Self {
        ErrorCategory::Io { source: error }
    }
}

impl From<base64::DecodeError> for ErrorCategory {
    fn from(error: base64::DecodeError) -> Self {
        ErrorCategory::IconGeneration { message: error.to_string() }
    }
}

impl From<mongodb::error::Error> for ErrorCategory {
    fn from(error: mongodb::error::Error) -> Self {
        ErrorCategory::Database { source: sqlx::Error::Protocol(error.to_string()) }
    }
}

impl From<EncryptionError> for ErrorCategory {
    fn from(error: EncryptionError) -> Self {
        ErrorCategory::Encryption { message: error.to_string() }
    }
}

impl From<IdenticonError> for ErrorCategory {
    fn from(error: IdenticonError) -> Self {
        ErrorCategory::IconGeneration { message: error.to_string() }
    }
}

impl From<&str> for ErrorCategory {
    fn from(error: &str) -> Self {
        ErrorCategory::Unknown { message: error.to_string() }
    }
}

impl From<String> for ErrorCategory {
    fn from(error: String) -> Self {
        ErrorCategory::Unknown { message: error }
    }
}

// Implement IntoError for ErrorCategory
impl<E> IntoError<E> for ErrorCategory
where
    E: Into<ErrorCategory> + StdError + snafu::ErrorCompat,
{
    type Source = E;

    fn into_error(self, source: Self::Source) -> E {
        source
    }
} 