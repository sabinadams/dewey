//! Error handling for the application.
//! 
//! This module provides a unified error handling system that categorizes errors by type
//! and severity, and includes detailed error information for debugging and user feedback.

use serde::{Serialize, Deserialize};
use snafu::Snafu;

/// Severity levels for errors
#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub enum ErrorSeverity {
    Info,
    Warning,
    Error,
    Critical,
}

/// Database-related subcategories
#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub enum DatabaseSubcategory {
    ConnectionFailed,
    QueryFailed,
    TransactionFailed,
    ConstraintViolation,
    InvalidData,
}

/// Migration-related subcategories
#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub enum MigrationSubcategory {
    VersionConflict,
    SchemaError,
    DataError,
    RollbackFailed,
}

/// IO-related subcategories
#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub enum IoSubcategory {
    ReadFailed,
    WriteFailed,
    PermissionDenied,
    PathNotFound,
    AlreadyExists,
}

/// Configuration-related subcategories
#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub enum ConfigSubcategory {
    ParseError,
    ValidationError,
    MissingRequired,
    InvalidFormat,
}

/// Icon-related subcategories
#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub enum IconSubcategory {
    GenerationFailed,
    SaveFailed,
    InvalidFormat,
    InvalidSize,
}

/// Keyring-related subcategories
#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub enum KeyringSubcategory {
    AccessDenied,
    KeyNotFound,
    KeyringUnavailable,
    InvalidKey,
}

/// Project-related subcategories
#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub enum ProjectSubcategory {
    NotFound,
    InvalidName,
    InvalidPath,
    AlreadyExists,
}

/// Connection-related subcategories
#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub enum ConnectionSubcategory {
    ConnectionFailed,
    Timeout,
    Refused,
    ProtocolError,
}

/// Validation-related subcategories
#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub enum ValidationSubcategory {
    InvalidFormat,
    MissingRequired,
    InvalidRange,
    InvalidType,
}

/// Authentication-related subcategories
#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub enum AuthSubcategory {
    InvalidCredentials,
    TokenExpired,
    AccountLocked,
    PermissionDenied,
}

/// Encryption-related subcategories
#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub enum EncryptionSubcategory {
    DecryptionFailed,
    EncryptionFailed,
    InvalidKey,
    KeyNotInitialized,
    SerializationFailed,
    DeserializationFailed,
    Base64DecodeFailed,
    Utf8DecodeFailed,
    KeyInitialization,
}

/// Key management-related subcategories
#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub enum KeyManagementSubcategory {
    KeyNotInitialized,
    KeyNotFound,
    KeyGenerationFailed,
    KeyStorageFailed,
    KeyRetrievalFailed,
}

/// Unknown error subcategories
#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub enum UnknownSubcategory {
    Unexpected,
    System,
    External,
}

/// All possible error categories
#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub enum ErrorCategory {
    Database(DatabaseSubcategory),
    Migration(MigrationSubcategory),
    Io(IoSubcategory),
    Config(ConfigSubcategory),
    IconGeneration(IconSubcategory),
    Icon(IconSubcategory),
    Keyring(KeyringSubcategory),
    KeyGeneration(KeyManagementSubcategory),
    Project(ProjectSubcategory),
    Encryption(EncryptionSubcategory),
    KeyManagement(KeyManagementSubcategory),
    Connection(ConnectionSubcategory),
    Validation(ValidationSubcategory),
    Auth(AuthSubcategory),
    Unknown(UnknownSubcategory),
}

/// The main error type for the application
#[derive(Debug, Snafu)]
pub struct AppError {
    pub message: String,
    pub category: ErrorCategory,
    pub severity: ErrorSeverity,
}

impl AppError {
    pub fn new(
        message: impl Into<String>,
        category: ErrorCategory,
        severity: ErrorSeverity,
    ) -> Self {
        Self {
            message: message.into(),
            category,
            severity,
        }
    }

    pub fn code(&self) -> u32 {
        // Generate a unique code based on category and subcategory
        let category_code = match self.category {
            ErrorCategory::Database(_) => 1000,
            ErrorCategory::Migration(_) => 2000,
            ErrorCategory::Io(_) => 3000,
            ErrorCategory::Config(_) => 4000,
            ErrorCategory::IconGeneration(_) => 5000,
            ErrorCategory::Icon(_) => 6000,
            ErrorCategory::Keyring(_) => 7000,
            ErrorCategory::KeyGeneration(_) => 8000,
            ErrorCategory::Project(_) => 9000,
            ErrorCategory::Encryption(_) => 10000,
            ErrorCategory::KeyManagement(_) => 11000,
            ErrorCategory::Connection(_) => 12000,
            ErrorCategory::Validation(_) => 13000,
            ErrorCategory::Auth(_) => 14000,
            ErrorCategory::Unknown(_) => 15000,
        };

        let subcategory_code = match &self.category {
            ErrorCategory::Database(sub) => *sub as u32,
            ErrorCategory::Migration(sub) => *sub as u32,
            ErrorCategory::Io(sub) => *sub as u32,
            ErrorCategory::Config(sub) => *sub as u32,
            ErrorCategory::IconGeneration(sub) => *sub as u32,
            ErrorCategory::Icon(sub) => *sub as u32,
            ErrorCategory::Keyring(sub) => *sub as u32,
            ErrorCategory::KeyGeneration(sub) => *sub as u32,
            ErrorCategory::Project(sub) => *sub as u32,
            ErrorCategory::Encryption(sub) => *sub as u32,
            ErrorCategory::KeyManagement(sub) => *sub as u32,
            ErrorCategory::Connection(sub) => *sub as u32,
            ErrorCategory::Validation(sub) => *sub as u32,
            ErrorCategory::Auth(sub) => *sub as u32,
            ErrorCategory::Unknown(sub) => *sub as u32,
        };

        category_code + subcategory_code
    }
}

// Convenience constructors for each error category
impl AppError {
    pub fn database(message: impl Into<String>, subcategory: DatabaseSubcategory, severity: ErrorSeverity) -> Self {
        Self::new(message, ErrorCategory::Database(subcategory), severity)
    }

    pub fn migration(message: impl Into<String>, subcategory: MigrationSubcategory, severity: ErrorSeverity) -> Self {
        Self::new(message, ErrorCategory::Migration(subcategory), severity)
    }

    pub fn io(message: impl Into<String>, subcategory: IoSubcategory, severity: ErrorSeverity) -> Self {
        Self::new(message, ErrorCategory::Io(subcategory), severity)
    }

    pub fn config(message: impl Into<String>, subcategory: ConfigSubcategory, severity: ErrorSeverity) -> Self {
        Self::new(message, ErrorCategory::Config(subcategory), severity)
    }

    pub fn icon_generation(message: impl Into<String>, subcategory: IconSubcategory, severity: ErrorSeverity) -> Self {
        Self::new(message, ErrorCategory::IconGeneration(subcategory), severity)
    }

    pub fn icon(message: impl Into<String>, subcategory: IconSubcategory, severity: ErrorSeverity) -> Self {
        Self::new(message, ErrorCategory::Icon(subcategory), severity)
    }

    pub fn keyring(message: impl Into<String>, subcategory: KeyringSubcategory, severity: ErrorSeverity) -> Self {
        Self::new(message, ErrorCategory::Keyring(subcategory), severity)
    }

    pub fn key_generation(message: impl Into<String>, subcategory: KeyManagementSubcategory, severity: ErrorSeverity) -> Self {
        Self::new(message, ErrorCategory::KeyGeneration(subcategory), severity)
    }

    pub fn project(message: impl Into<String>, subcategory: ProjectSubcategory, severity: ErrorSeverity) -> Self {
        Self::new(message, ErrorCategory::Project(subcategory), severity)
    }

    pub fn encryption(message: impl Into<String>, subcategory: EncryptionSubcategory, severity: ErrorSeverity) -> Self {
        Self::new(message, ErrorCategory::Encryption(subcategory), severity)
    }

    pub fn key_management(message: impl Into<String>, subcategory: KeyManagementSubcategory, severity: ErrorSeverity) -> Self {
        Self::new(message, ErrorCategory::KeyManagement(subcategory), severity)
    }

    pub fn connection(message: impl Into<String>, subcategory: ConnectionSubcategory, severity: ErrorSeverity) -> Self {
        Self::new(message, ErrorCategory::Connection(subcategory), severity)
    }

    pub fn validation(message: impl Into<String>, subcategory: ValidationSubcategory, severity: ErrorSeverity) -> Self {
        Self::new(message, ErrorCategory::Validation(subcategory), severity)
    }

    pub fn auth(message: impl Into<String>, subcategory: AuthSubcategory, severity: ErrorSeverity) -> Self {
        Self::new(message, ErrorCategory::Auth(subcategory), severity)
    }

    pub fn unknown(message: impl Into<String>, subcategory: UnknownSubcategory, severity: ErrorSeverity) -> Self {
        Self::new(message, ErrorCategory::Unknown(subcategory), severity)
    }
} 