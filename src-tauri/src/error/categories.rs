use serde::{Serialize, Deserialize};

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
    MigrationFailed,
}

/// IO-related subcategories
#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub enum IoSubcategory {
    ReadFailed,
    WriteFailed,
    CreateFailed,
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
    NotFound,
}

/// Icon-related subcategories
#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub enum IconSubcategory {
    GenerationFailed,
    SaveFailed,
    InvalidFormat,
    InvalidSize,
    InvalidPath,
    Base64DecodeFailed,
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
    KeyNotFound,
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
    InvalidLength,
    StorageFailed,
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