use std::fmt;
use std::io;
use super::types::{AppError, ErrorSeverity};
use super::categories::{ErrorCategory, *};

impl fmt::Display for ErrorCategory {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            ErrorCategory::Database(sub) => write!(f, "Database error: {:?}", sub),
            ErrorCategory::Migration(sub) => write!(f, "Migration error: {:?}", sub),
            ErrorCategory::Io(sub) => write!(f, "IO error: {:?}", sub),
            ErrorCategory::Config(sub) => write!(f, "Configuration error: {:?}", sub),
            ErrorCategory::IconGeneration(sub) => write!(f, "Icon generation error: {:?}", sub),
            ErrorCategory::Icon(sub) => write!(f, "Icon error: {:?}", sub),
            ErrorCategory::Keyring(sub) => write!(f, "Keyring error: {:?}", sub),
            ErrorCategory::KeyGeneration(sub) => write!(f, "Key generation error: {:?}", sub),
            ErrorCategory::Project(sub) => write!(f, "Project error: {:?}", sub),
            ErrorCategory::Encryption(sub) => write!(f, "Encryption error: {:?}", sub),
            ErrorCategory::KeyManagement(sub) => write!(f, "Key management error: {:?}", sub),
            ErrorCategory::Connection(sub) => write!(f, "Connection error: {:?}", sub),
            ErrorCategory::Validation(sub) => write!(f, "Validation error: {:?}", sub),
            ErrorCategory::Auth(sub) => write!(f, "Authentication error: {:?}", sub),
            ErrorCategory::Unknown(sub) => write!(f, "Unknown error: {:?}", sub),
        }
    }
}

impl From<AppError> for ErrorCategory {
    fn from(error: AppError) -> Self {
        error.category
    }
}

impl From<&str> for ErrorCategory {
    fn from(_s: &str) -> Self {
        ErrorCategory::Unknown(UnknownSubcategory::Unexpected)
    }
}

impl From<String> for ErrorCategory {
    fn from(_s: String) -> Self {
        ErrorCategory::Unknown(UnknownSubcategory::Unexpected)
    }
}

impl From<sqlx::Error> for ErrorCategory {
    fn from(_error: sqlx::Error) -> Self {
        ErrorCategory::Database(DatabaseSubcategory::QueryFailed)
    }
}

impl From<mongodb::error::Error> for ErrorCategory {
    fn from(_error: mongodb::error::Error) -> Self {
        ErrorCategory::Database(DatabaseSubcategory::QueryFailed)
    }
}

impl From<io::Error> for ErrorCategory {
    fn from(error: io::Error) -> Self {
        let subcategory = match error.kind() {
            io::ErrorKind::NotFound => IoSubcategory::PathNotFound,
            io::ErrorKind::PermissionDenied => IoSubcategory::PermissionDenied,
            io::ErrorKind::AlreadyExists => IoSubcategory::AlreadyExists,
            _ => IoSubcategory::ReadFailed,
        };
        ErrorCategory::Io(subcategory)
    }
}

impl From<base64::DecodeError> for ErrorCategory {
    fn from(_error: base64::DecodeError) -> Self {
        ErrorCategory::Encryption(EncryptionSubcategory::Base64DecodeFailed)
    }
}

impl From<serde_json::Error> for ErrorCategory {
    fn from(_error: serde_json::Error) -> Self {
        ErrorCategory::Config(ConfigSubcategory::ParseError)
    }
}

impl From<ErrorCategory> for AppError {
    fn from(category: ErrorCategory) -> Self {
        let message = match &category {
            ErrorCategory::Database(sub) => format!("Database error: {:?}", sub),
            ErrorCategory::Migration(sub) => format!("Migration error: {:?}", sub),
            ErrorCategory::Io(sub) => format!("IO error: {:?}", sub),
            ErrorCategory::Config(sub) => format!("Configuration error: {:?}", sub),
            ErrorCategory::IconGeneration(sub) => format!("Icon generation error: {:?}", sub),
            ErrorCategory::Icon(sub) => format!("Icon error: {:?}", sub),
            ErrorCategory::Keyring(sub) => format!("Keyring error: {:?}", sub),
            ErrorCategory::KeyGeneration(sub) => format!("Key generation error: {:?}", sub),
            ErrorCategory::Project(sub) => format!("Project error: {:?}", sub),
            ErrorCategory::Encryption(sub) => format!("Encryption error: {:?}", sub),
            ErrorCategory::KeyManagement(sub) => format!("Key management error: {:?}", sub),
            ErrorCategory::Connection(sub) => format!("Connection error: {:?}", sub),
            ErrorCategory::Validation(sub) => format!("Validation error: {:?}", sub),
            ErrorCategory::Auth(sub) => format!("Authentication error: {:?}", sub),
            ErrorCategory::Unknown(sub) => format!("Unknown error: {:?}", sub),
        };
        Self::new(message, category, ErrorSeverity::Error)
    }
}

impl snafu::IntoError<AppError> for AppError {
    type Source = ErrorCategory;

    fn into_error(self, source: Self::Source) -> AppError {
        AppError::new(self.message, source, self.severity)
    }
}

impl From<AppError> for io::Error {
    fn from(error: AppError) -> Self {
        io::Error::new(io::ErrorKind::Other, error.message)
    }
} 