use snafu::{Snafu, IntoError};
use std::error::Error as StdError;
use identicon_rs::error::IdenticonError;
use serde::Serialize;

/// Error categories for the application
#[derive(Debug, Snafu, Serialize)]
#[snafu(visibility(pub))]
pub enum ErrorCategory {
    #[snafu(display("Database error: {}", source))]
    Database { 
        #[serde(serialize_with = "serialize_error")]
        source: sqlx::Error,
        #[serde(skip_serializing_if = "Option::is_none")]
        subcategory: Option<String>
    },

    #[snafu(display("Migration error: {}", message))]
    Migration { 
        message: String,
        #[serde(skip_serializing_if = "Option::is_none")]
        subcategory: Option<String>
    },

    #[snafu(display("IO error: {}", source))]
    Io { 
        #[serde(serialize_with = "serialize_error")]
        source: std::io::Error,
        #[serde(skip_serializing_if = "Option::is_none")]
        subcategory: Option<String>
    },

    #[snafu(display("Configuration error: {}", message))]
    Config { 
        message: String,
        #[serde(skip_serializing_if = "Option::is_none")]
        subcategory: Option<String>
    },

    #[snafu(display("Icon generation error: {}", message))]
    IconGeneration { 
        message: String,
        #[serde(skip_serializing_if = "Option::is_none")]
        subcategory: Option<String>
    },

    #[snafu(display("Image error: {}", source))]
    Image { 
        #[serde(serialize_with = "serialize_error")]
        source: image::ImageError,
        #[serde(skip_serializing_if = "Option::is_none")]
        subcategory: Option<String>
    },

    #[snafu(display("File not found: {}", message))]
    FileNotFound { 
        message: String,
        #[serde(skip_serializing_if = "Option::is_none")]
        subcategory: Option<String>
    },

    #[snafu(display("Keyring error: {}", message))]
    Keyring { 
        message: String,
        #[serde(skip_serializing_if = "Option::is_none")]
        subcategory: Option<KeyringSubcategory>
    },

    #[snafu(display("Key generation error: {}", message))]
    KeyGeneration { 
        message: String,
        #[serde(skip_serializing_if = "Option::is_none")]
        subcategory: Option<KeyGenerationSubcategory>
    },

    #[snafu(display("Project error: {}", message))]
    Project { 
        message: String,
        #[serde(skip_serializing_if = "Option::is_none")]
        subcategory: Option<ProjectSubcategory>
    },

    #[snafu(display("Icon error: {}", message))]
    Icon { 
        message: String,
        #[serde(skip_serializing_if = "Option::is_none")]
        subcategory: Option<String>
    },

    #[snafu(display("Connection error: {}", message))]
    Connection { 
        message: String,
        #[serde(skip_serializing_if = "Option::is_none")]
        subcategory: Option<String>
    },

    #[snafu(display("Validation error: {}", message))]
    Validation { 
        message: String,
        #[serde(skip_serializing_if = "Option::is_none")]
        subcategory: Option<String>
    },

    #[snafu(display("Authentication error: {}", message))]
    Auth { 
        message: String,
        #[serde(skip_serializing_if = "Option::is_none")]
        subcategory: Option<String>
    },

    #[snafu(display("Unknown error: {}", message))]
    Unknown { 
        message: String,
        #[serde(skip_serializing_if = "Option::is_none")]
        subcategory: Option<String>
    },

    #[snafu(display("Encryption error: {}", message))]
    Encryption { 
        message: String,
        #[serde(skip_serializing_if = "Option::is_none")]
        subcategory: Option<String>
    },
}

/// Main error type for the application
pub type AppError = ErrorCategory;

// Helper function to create error responses
pub fn create_error_response(error: AppError) -> serde_json::Value {
    serde_json::json!({
        "category": error.category_name(),
        "message": error.to_string(),
        "subcategory": match &error {
            ErrorCategory::Keyring { subcategory, .. } => subcategory.as_ref().map(|s| format!("{:?}", s)),
            ErrorCategory::KeyGeneration { subcategory, .. } => subcategory.as_ref().map(|s| format!("{:?}", s)),
            _ => None,
        }
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
        ErrorCategory::Database { source: error, subcategory: None }
    }
}

impl From<std::io::Error> for ErrorCategory {
    fn from(error: std::io::Error) -> Self {
        ErrorCategory::Io { source: error, subcategory: None }
    }
}

impl From<base64::DecodeError> for ErrorCategory {
    fn from(error: base64::DecodeError) -> Self {
        ErrorCategory::Encryption { 
            message: error.to_string(), 
            subcategory: Some("Base64DecodeFailed".to_string()) 
        }
    }
}

impl From<mongodb::error::Error> for ErrorCategory {
    fn from(error: mongodb::error::Error) -> Self {
        ErrorCategory::Database { source: sqlx::Error::Protocol(error.to_string()), subcategory: None }
    }
}

impl From<IdenticonError> for ErrorCategory {
    fn from(error: IdenticonError) -> Self {
        ErrorCategory::IconGeneration { message: error.to_string(), subcategory: None }
    }
}

impl From<&str> for ErrorCategory {
    fn from(error: &str) -> Self {
        ErrorCategory::Unknown { message: error.to_string(), subcategory: None }
    }
}

impl From<String> for ErrorCategory {
    fn from(error: String) -> Self {
        ErrorCategory::Unknown { message: error, subcategory: None }
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

#[derive(Debug, Serialize)]
pub enum KeyringSubcategory {
    AccessDenied,
    KeyNotFound,
    KeyringUnavailable,
    InvalidKey,
}

#[derive(Debug, Serialize)]
pub enum KeyGenerationSubcategory {
    GenerationFailed,
    StorageFailed,
    InvalidKeyLength,
}

#[derive(Debug, Serialize)]
pub enum ProjectSubcategory {
    NotFound,
    InvalidName,
    InvalidPath,
} 