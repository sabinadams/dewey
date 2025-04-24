use snafu::{Snafu, IntoError};
use std::error::Error as StdError;
use identicon_rs::error::IdenticonError;
use serde::{Serialize, Deserialize};
use crate::error_subcategories::*;

/// Error categories for the application
#[derive(Debug, Snafu, Serialize, Deserialize)]
pub enum ErrorCategory {
    #[snafu(display("Database error: {}", message))]
    Database {
        message: String,
        subcategory: Option<DatabaseSubcategory>,
    },
    #[snafu(display("Migration error: {}", message))]
    Migration {
        message: String,
        subcategory: Option<MigrationSubcategory>,
    },
    #[snafu(display("IO error: {}", message))]
    Io {
        message: String,
        subcategory: Option<IoSubcategory>,
    },
    #[snafu(display("Config error: {}", message))]
    Config {
        message: String,
        subcategory: Option<ConfigSubcategory>,
    },
    #[snafu(display("Icon generation error: {}", message))]
    IconGeneration {
        message: String,
        subcategory: Option<IconGenerationSubcategory>,
    },
    #[snafu(display("Image error: {}", message))]
    Image {
        message: String,
        subcategory: Option<ImageSubcategory>,
    },
    #[snafu(display("File not found: {}", message))]
    FileNotFound {
        message: String,
        subcategory: Option<FileNotFoundSubcategory>,
    },
    #[snafu(display("Keyring error: {}", message))]
    Keyring {
        message: String,
        subcategory: Option<KeyringSubcategory>,
    },
    #[snafu(display("Key generation error: {}", message))]
    KeyGeneration {
        message: String,
        subcategory: Option<KeyGenerationSubcategory>,
    },
    #[snafu(display("Project error: {}", message))]
    Project {
        message: String,
        subcategory: Option<ProjectSubcategory>,
    },
    #[snafu(display("Icon error: {}", message))]
    Icon {
        message: String,
        subcategory: Option<IconSubcategory>,
    },
    #[snafu(display("Connection error: {}", message))]
    Connection {
        message: String,
        subcategory: Option<ConnectionSubcategory>,
    },
    #[snafu(display("Validation error: {}", message))]
    Validation {
        message: String,
        subcategory: Option<ValidationSubcategory>,
    },
    #[snafu(display("Auth error: {}", message))]
    Auth {
        message: String,
        subcategory: Option<AuthSubcategory>,
    },
    #[snafu(display("Unknown error: {}", message))]
    Unknown {
        message: String,
        subcategory: Option<UnknownSubcategory>,
    },
    #[snafu(display("Encryption error: {}", message))]
    Encryption {
        message: String,
        subcategory: Option<EncryptionSubcategory>,
    },
    #[snafu(display("Key management error: {}", message))]
    KeyManagement {
        message: String,
        subcategory: Option<KeyManagementSubcategory>,
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
            ErrorCategory::Database { subcategory, .. } => subcategory.as_ref().map(|s| format!("{:?}", s)),
            ErrorCategory::Migration { subcategory, .. } => subcategory.as_ref().map(|s| format!("{:?}", s)),
            ErrorCategory::Io { subcategory, .. } => subcategory.as_ref().map(|s| format!("{:?}", s)),
            ErrorCategory::Config { subcategory, .. } => subcategory.as_ref().map(|s| format!("{:?}", s)),
            ErrorCategory::IconGeneration { subcategory, .. } => subcategory.as_ref().map(|s| format!("{:?}", s)),
            ErrorCategory::Image { subcategory, .. } => subcategory.as_ref().map(|s| format!("{:?}", s)),
            ErrorCategory::FileNotFound { subcategory, .. } => subcategory.as_ref().map(|s| format!("{:?}", s)),
            ErrorCategory::Keyring { subcategory, .. } => subcategory.as_ref().map(|s| format!("{:?}", s)),
            ErrorCategory::KeyGeneration { subcategory, .. } => subcategory.as_ref().map(|s| format!("{:?}", s)),
            ErrorCategory::Project { subcategory, .. } => subcategory.as_ref().map(|s| format!("{:?}", s)),
            ErrorCategory::Icon { subcategory, .. } => subcategory.as_ref().map(|s| format!("{:?}", s)),
            ErrorCategory::Connection { subcategory, .. } => subcategory.as_ref().map(|s| format!("{:?}", s)),
            ErrorCategory::Validation { subcategory, .. } => subcategory.as_ref().map(|s| format!("{:?}", s)),
            ErrorCategory::Auth { subcategory, .. } => subcategory.as_ref().map(|s| format!("{:?}", s)),
            ErrorCategory::Unknown { subcategory, .. } => subcategory.as_ref().map(|s| format!("{:?}", s)),
            ErrorCategory::Encryption { subcategory, .. } => subcategory.as_ref().map(|s| format!("{:?}", s)),
            ErrorCategory::KeyManagement { subcategory, .. } => subcategory.as_ref().map(|s| format!("{:?}", s)),
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
            ErrorCategory::KeyManagement { .. } => "KEY_MANAGEMENT",
        }
    }
}

// Implement From for various error types
impl From<sqlx::Error> for ErrorCategory {
    fn from(error: sqlx::Error) -> Self {
        ErrorCategory::Database { message: error.to_string(), subcategory: None }
    }
}

impl From<std::io::Error> for ErrorCategory {
    fn from(error: std::io::Error) -> Self {
        ErrorCategory::Io { message: error.to_string(), subcategory: None }
    }
}

impl From<base64::DecodeError> for ErrorCategory {
    fn from(error: base64::DecodeError) -> Self {
        ErrorCategory::Encryption { 
            message: error.to_string(), 
            subcategory: Some(EncryptionSubcategory::InvalidFormat)
        }
    }
}

impl From<mongodb::error::Error> for ErrorCategory {
    fn from(error: mongodb::error::Error) -> Self {
        ErrorCategory::Database { message: sqlx::Error::Protocol(error.to_string()).to_string(), subcategory: None }
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