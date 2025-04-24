//! Error subcategories for the application.
//! 
//! This module defines the subcategories for each error type in the application.
//! These subcategories provide more detailed information about the specific nature
//! of an error, helping with debugging and error handling.

use serde::{Serialize, Deserialize};

/// Subcategories for database-related errors
#[derive(Debug, Serialize, Deserialize)]
pub enum DatabaseSubcategory {
    /// Failed to establish a connection to the database
    ConnectionFailed,
    /// Failed to execute a database query
    QueryFailed,
    /// Failed to execute a database transaction
    TransactionFailed,
    /// Violated a database constraint
    ConstraintViolation,
    /// Invalid data was provided to the database
    InvalidData,
}

/// Subcategories for migration-related errors
#[derive(Debug, Serialize, Deserialize)]
pub enum MigrationSubcategory {
    /// Version conflict during migration
    VersionConflict,
    /// Error in the database schema
    SchemaError,
    /// Error in the data being migrated
    DataError,
    /// Failed to rollback a migration
    RollbackFailed,
}

/// Subcategories for I/O-related errors
#[derive(Debug, Serialize, Deserialize)]
pub enum IoSubcategory {
    /// Failed to read from a file or stream
    ReadFailed,
    /// Failed to write to a file or stream
    WriteFailed,
    /// Permission denied for the operation
    PermissionDenied,
    /// The specified path was not found
    PathNotFound,
    /// The specified path already exists
    AlreadyExists,
}

/// Subcategories for configuration-related errors
#[derive(Debug, Serialize, Deserialize)]
pub enum ConfigSubcategory {
    /// Failed to parse the configuration
    ParseError,
    /// Failed to validate the configuration
    ValidationError,
    /// Missing required configuration value
    MissingRequired,
    /// Invalid configuration format
    InvalidFormat,
}

/// Subcategories for icon generation-related errors
#[derive(Debug, Serialize, Deserialize)]
pub enum IconGenerationSubcategory {
    /// Failed to generate an icon
    GenerationFailed,
    /// Failed to save an icon
    SaveFailed,
    /// Invalid icon format
    InvalidFormat,
    /// Invalid icon size
    InvalidSize,
}

/// Subcategories for image-related errors
#[derive(Debug, Serialize, Deserialize)]
pub enum ImageSubcategory {
    /// Failed to process an image
    ProcessingFailed,
    /// Invalid image format
    InvalidFormat,
    /// Invalid image size
    InvalidSize,
    /// Failed to save an image
    SaveFailed,
}

/// Subcategories for file not found errors
#[derive(Debug, Serialize, Deserialize)]
pub enum FileNotFoundSubcategory {
    /// Resource not found
    ResourceNotFound,
    /// Configuration file not found
    ConfigNotFound,
    /// Asset not found
    AssetNotFound,
    /// Database file not found
    DatabaseNotFound,
}

/// Subcategories for keyring-related errors
#[derive(Debug, Serialize, Deserialize)]
pub enum KeyringSubcategory {
    /// Access denied to the keyring
    AccessDenied,
    /// Key not found in the keyring
    KeyNotFound,
    /// Keyring service unavailable
    KeyringUnavailable,
    /// Invalid key in the keyring
    InvalidKey,
}

/// Subcategories for key generation-related errors
#[derive(Debug, Serialize, Deserialize)]
pub enum KeyGenerationSubcategory {
    /// Failed to generate a key
    GenerationFailed,
    /// Failed to store a key
    StorageFailed,
    /// Invalid key length
    InvalidLength,
}

/// Subcategories for project-related errors
#[derive(Debug, Serialize, Deserialize)]
pub enum ProjectSubcategory {
    /// Project not found
    NotFound,
    /// Invalid project name
    InvalidName,
    /// Invalid project path
    InvalidPath,
    /// Project already exists
    AlreadyExists,
}

/// Subcategories for icon-related errors
#[derive(Debug, Serialize, Deserialize)]
pub enum IconSubcategory {
    /// Failed to generate an icon
    GenerationFailed,
    /// Failed to save an icon
    SaveFailed,
    /// Invalid icon format
    InvalidFormat,
    /// Invalid icon size
    InvalidSize,
}

/// Subcategories for connection-related errors
#[derive(Debug, Serialize, Deserialize)]
pub enum ConnectionSubcategory {
    /// Failed to establish a connection
    ConnectionFailed,
    /// Connection timed out
    Timeout,
    /// Connection was refused
    Refused,
    /// Protocol error during connection
    ProtocolError,
}

/// Subcategories for validation-related errors
#[derive(Debug, Serialize, Deserialize)]
pub enum ValidationSubcategory {
    /// Invalid format for a field
    InvalidFormat,
    /// Missing required field
    MissingRequired,
    /// Invalid range for a field
    InvalidRange,
    /// Invalid type for a field
    InvalidType,
}

/// Subcategories for authentication-related errors
#[derive(Debug, Serialize, Deserialize)]
pub enum AuthSubcategory {
    /// Invalid credentials provided
    InvalidCredentials,
    /// Authentication token has expired
    TokenExpired,
    /// Account has been locked
    AccountLocked,
    /// Permission denied for the operation
    PermissionDenied,
}

/// Subcategories for unknown errors
#[derive(Debug, Serialize, Deserialize)]
pub enum UnknownSubcategory {
    /// Unexpected error occurred
    Unexpected,
    /// System error occurred
    System,
    /// External error occurred
    External,
}

/// Subcategories for encryption-related errors
#[derive(Debug, Serialize, Deserialize)]
pub enum EncryptionSubcategory {
    /// Failed to decrypt data
    DecryptionFailed,
    /// Failed to encrypt data
    EncryptionFailed,
    /// Invalid encryption key
    InvalidKey,
    /// Invalid encryption format
    InvalidFormat,
    /// Encryption key not initialized
    KeyNotInitialized,
    /// Failed to serialize data
    SerializationFailed,
    /// Failed to deserialize data
    DeserializationFailed,
    /// Failed to decode base64 data
    Base64DecodeFailed,
    /// Failed to decode UTF-8 data
    Utf8DecodeFailed,
    /// Failed to initialize encryption key
    KeyInitialization,
}

/// Subcategories for key management-related errors
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub enum KeyManagementSubcategory {
    /// Key management not initialized
    KeyNotInitialized,
    /// Key not found
    KeyNotFound,
    /// Failed to generate a key
    KeyGenerationFailed,
    /// Failed to store a key
    KeyStorageFailed,
    /// Failed to retrieve a key
    KeyRetrievalFailed,
} 