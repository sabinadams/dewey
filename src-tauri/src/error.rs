use snafu::{Snafu, IntoError, ErrorCompat};
use std::error::Error as StdError;
use identicon_rs::error::IdenticonError;
use serde::{Serialize, Deserialize};
use chrono::Utc;
use crate::error_subcategories::*;

/// Severity levels for errors
#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub enum ErrorSeverity {
    Info,
    Warning,
    Error,
    Critical,
}

/// Error categories for the application
#[derive(Debug, Snafu, Serialize, Deserialize)]
pub enum ErrorCategory {
    #[snafu(display("Database error: {}", message))]
    Database {
        message: String,
        subcategory: Option<DatabaseSubcategory>,
        code: u32,
        severity: ErrorSeverity,
    },
    #[snafu(display("Connection error: {}", message))]
    Connection {
        message: String,
        subcategory: Option<ConnectionSubcategory>,
        code: u32,
        severity: ErrorSeverity,
    },
    #[snafu(display("Migration error: {}", message))]
    Migration {
        message: String,
        subcategory: Option<MigrationSubcategory>,
        code: u32,
        severity: ErrorSeverity,
    },
    #[snafu(display("IO error: {}", message))]
    Io {
        message: String,
        subcategory: Option<IoSubcategory>,
        code: u32,
        severity: ErrorSeverity,
    },
    #[snafu(display("Config error: {}", message))]
    Config {
        message: String,
        subcategory: Option<ConfigSubcategory>,
        code: u32,
        severity: ErrorSeverity,
    },
    #[snafu(display("Icon generation error: {}", message))]
    IconGeneration {
        message: String,
        subcategory: Option<IconGenerationSubcategory>,
        code: u32,
        severity: ErrorSeverity,
    },
    #[snafu(display("Icon error: {}", message))]
    Icon {
        message: String,
        subcategory: Option<IconSubcategory>,
        code: u32,
        severity: ErrorSeverity,
    },
    #[snafu(display("Keyring error: {}", message))]
    Keyring {
        message: String,
        subcategory: Option<KeyringSubcategory>,
        code: u32,
        severity: ErrorSeverity,
    },
    #[snafu(display("Key generation error: {}", message))]
    KeyGeneration {
        message: String,
        subcategory: Option<KeyGenerationSubcategory>,
        code: u32,
        severity: ErrorSeverity,
    },
    #[snafu(display("Project error: {}", message))]
    Project {
        message: String,
        subcategory: Option<ProjectSubcategory>,
        code: u32,
        severity: ErrorSeverity,
    },
    #[snafu(display("Encryption error: {}", message))]
    Encryption {
        message: String,
        subcategory: Option<EncryptionSubcategory>,
        code: u32,
        severity: ErrorSeverity,
    },
    #[snafu(display("Key management error: {}", message))]
    KeyManagement {
        message: String,
        subcategory: Option<KeyManagementSubcategory>,
        code: u32,
        severity: ErrorSeverity,
    },
}

/// Main error type for the application
pub type AppError = ErrorCategory;

// Helper function to create error responses
pub fn create_error_response(error: AppError) -> serde_json::Value {
    let timestamp = Utc::now();
    serde_json::json!({
        "timestamp": timestamp.to_rfc3339(),
        "category": error.category_name(),
        "message": error.to_string(),
        "code": error.get_code(),
        "severity": error.get_severity(),
        "subcategory": error.get_subcategory(),
    })
}

impl ErrorCategory {
    pub fn category_name(&self) -> &'static str {
        match self {
            ErrorCategory::Database { .. } => "DATABASE",
            ErrorCategory::Connection { .. } => "CONNECTION",
            ErrorCategory::Migration { .. } => "MIGRATION",
            ErrorCategory::Io { .. } => "IO",
            ErrorCategory::Config { .. } => "CONFIG",
            ErrorCategory::IconGeneration { .. } => "ICON_GENERATION",
            ErrorCategory::Icon { .. } => "ICON",
            ErrorCategory::Keyring { .. } => "KEYRING",
            ErrorCategory::KeyGeneration { .. } => "KEY_GENERATION",
            ErrorCategory::Project { .. } => "PROJECT",
            ErrorCategory::Encryption { .. } => "ENCRYPTION",
            ErrorCategory::KeyManagement { .. } => "KEY_MANAGEMENT",
        }
    }

    pub fn get_code(&self) -> u32 {
        match self {
            ErrorCategory::Database { code, .. } => *code,
            ErrorCategory::Connection { code, .. } => *code,
            ErrorCategory::Migration { code, .. } => *code,
            ErrorCategory::Io { code, .. } => *code,
            ErrorCategory::Config { code, .. } => *code,
            ErrorCategory::IconGeneration { code, .. } => *code,
            ErrorCategory::Icon { code, .. } => *code,
            ErrorCategory::Keyring { code, .. } => *code,
            ErrorCategory::KeyGeneration { code, .. } => *code,
            ErrorCategory::Project { code, .. } => *code,
            ErrorCategory::Encryption { code, .. } => *code,
            ErrorCategory::KeyManagement { code, .. } => *code,
        }
    }

    pub fn get_severity(&self) -> ErrorSeverity {
        match self {
            ErrorCategory::Database { severity, .. } => *severity,
            ErrorCategory::Connection { severity, .. } => *severity,
            ErrorCategory::Migration { severity, .. } => *severity,
            ErrorCategory::Io { severity, .. } => *severity,
            ErrorCategory::Config { severity, .. } => *severity,
            ErrorCategory::IconGeneration { severity, .. } => *severity,
            ErrorCategory::Icon { severity, .. } => *severity,
            ErrorCategory::Keyring { severity, .. } => *severity,
            ErrorCategory::KeyGeneration { severity, .. } => *severity,
            ErrorCategory::Project { severity, .. } => *severity,
            ErrorCategory::Encryption { severity, .. } => *severity,
            ErrorCategory::KeyManagement { severity, .. } => *severity,
        }
    }

    pub fn get_subcategory(&self) -> Option<String> {
        match self {
            ErrorCategory::Database { subcategory, .. } => subcategory.as_ref().map(|s| format!("{:?}", s)),
            ErrorCategory::Connection { subcategory, .. } => subcategory.as_ref().map(|s| format!("{:?}", s)),
            ErrorCategory::Migration { subcategory, .. } => subcategory.as_ref().map(|s| format!("{:?}", s)),
            ErrorCategory::Io { subcategory, .. } => subcategory.as_ref().map(|s| format!("{:?}", s)),
            ErrorCategory::Config { subcategory, .. } => subcategory.as_ref().map(|s| format!("{:?}", s)),
            ErrorCategory::IconGeneration { subcategory, .. } => subcategory.as_ref().map(|s| format!("{:?}", s)),
            ErrorCategory::Icon { subcategory, .. } => subcategory.as_ref().map(|s| format!("{:?}", s)),
            ErrorCategory::Keyring { subcategory, .. } => subcategory.as_ref().map(|s| format!("{:?}", s)),
            ErrorCategory::KeyGeneration { subcategory, .. } => subcategory.as_ref().map(|s| format!("{:?}", s)),
            ErrorCategory::Project { subcategory, .. } => subcategory.as_ref().map(|s| format!("{:?}", s)),
            ErrorCategory::Encryption { subcategory, .. } => subcategory.as_ref().map(|s| format!("{:?}", s)),
            ErrorCategory::KeyManagement { subcategory, .. } => subcategory.as_ref().map(|s| format!("{:?}", s)),
        }
    }

    pub fn new_encryption(message: String, subcategory: Option<EncryptionSubcategory>) -> Self {
        ErrorCategory::Encryption {
            message,
            subcategory,
            code: 14000,
            severity: ErrorSeverity::Error,
        }
    }

    pub fn new_database(message: String, subcategory: Option<DatabaseSubcategory>) -> Self {
        ErrorCategory::Database {
            message,
            subcategory,
            code: 1000,
            severity: ErrorSeverity::Error,
        }
    }

    pub fn new_migration(message: String, subcategory: Option<MigrationSubcategory>) -> Self {
        ErrorCategory::Migration {
            message,
            subcategory,
            code: 2000,
            severity: ErrorSeverity::Error,
        }
    }

    pub fn new_io(message: String, subcategory: Option<IoSubcategory>) -> Self {
        ErrorCategory::Io {
            message,
            subcategory,
            code: 3000,
            severity: ErrorSeverity::Error,
        }
    }

    pub fn new_config(message: String, subcategory: Option<ConfigSubcategory>) -> Self {
        ErrorCategory::Config {
            message,
            subcategory,
            code: 5000,
            severity: ErrorSeverity::Error,
        }
    }

    pub fn new_icon_generation(message: String, subcategory: Option<IconGenerationSubcategory>) -> Self {
        ErrorCategory::IconGeneration {
            message,
            subcategory,
            code: 4000,
            severity: ErrorSeverity::Error,
        }
    }

    pub fn new_keyring(message: String, subcategory: Option<KeyringSubcategory>) -> Self {
        ErrorCategory::Keyring {
            message,
            subcategory,
            code: 7000,
            severity: ErrorSeverity::Error,
        }
    }

    pub fn new_key_generation(message: String, subcategory: Option<KeyGenerationSubcategory>) -> Self {
        ErrorCategory::KeyGeneration {
            message,
            subcategory,
            code: 8000,
            severity: ErrorSeverity::Error,
        }
    }

    pub fn new_project(message: String, subcategory: Option<ProjectSubcategory>) -> Self {
        ErrorCategory::Project {
            message,
            subcategory,
            code: 9000,
            severity: ErrorSeverity::Error,
        }
    }

    pub fn new_key_management(message: String, subcategory: Option<KeyManagementSubcategory>) -> Self {
        ErrorCategory::KeyManagement {
            message,
            subcategory,
            code: 15000,
            severity: ErrorSeverity::Error,
        }
    }

    pub fn new_icon(message: String, subcategory: Option<IconSubcategory>) -> Self {
        ErrorCategory::Icon {
            message,
            subcategory,
            code: 9500,
            severity: ErrorSeverity::Error,
        }
    }

    pub fn new_connection(message: String, subcategory: Option<ConnectionSubcategory>) -> Self {
        ErrorCategory::Connection {
            message,
            subcategory,
            code: 10000,
            severity: ErrorSeverity::Error,
        }
    }
}

impl From<sqlx::Error> for ErrorCategory {
    fn from(error: sqlx::Error) -> Self {
        ErrorCategory::new_database(error.to_string(), None)
    }
}

impl From<std::io::Error> for ErrorCategory {
    fn from(error: std::io::Error) -> Self {
        ErrorCategory::new_io(error.to_string(), None)
    }
}

impl From<IdenticonError> for ErrorCategory {
    fn from(error: IdenticonError) -> Self {
        ErrorCategory::new_icon_generation(error.to_string(), None)
    }
}

impl From<&str> for ErrorCategory {
    fn from(error: &str) -> Self {
        ErrorCategory::new_config(error.to_string(), None)
    }
}

impl From<String> for ErrorCategory {
    fn from(error: String) -> Self {
        ErrorCategory::new_config(error, None)
    }
}

impl From<mongodb::error::Error> for ErrorCategory {
    fn from(error: mongodb::error::Error) -> Self {
        ErrorCategory::new_database(error.to_string(), None)
    }
}

impl<E> IntoError<E> for ErrorCategory
where
    E: StdError + ErrorCompat + 'static,
{
    type Source = E;

    fn into_error(self, source: Self::Source) -> E {
        source
    }
} 