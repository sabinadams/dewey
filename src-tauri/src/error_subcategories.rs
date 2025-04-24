use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
pub enum DatabaseSubcategory {
    ConnectionFailed,
    QueryFailed,
    TransactionFailed,
    ConstraintViolation,
    InvalidData,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum MigrationSubcategory {
    VersionConflict,
    SchemaError,
    DataError,
    RollbackFailed,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum IoSubcategory {
    ReadFailed,
    WriteFailed,
    PermissionDenied,
    PathNotFound,
    AlreadyExists,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum ConfigSubcategory {
    ParseError,
    ValidationError,
    MissingRequired,
    InvalidFormat,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum IconGenerationSubcategory {
    GenerationFailed,
    SaveFailed,
    InvalidFormat,
    InvalidSize,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum ImageSubcategory {
    ProcessingFailed,
    InvalidFormat,
    InvalidSize,
    SaveFailed,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum FileNotFoundSubcategory {
    ResourceNotFound,
    ConfigNotFound,
    AssetNotFound,
    DatabaseNotFound,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum KeyringSubcategory {
    AccessDenied,
    KeyNotFound,
    KeyringUnavailable,
    InvalidKey,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum KeyGenerationSubcategory {
    GenerationFailed,
    StorageFailed,
    InvalidLength,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum ProjectSubcategory {
    NotFound,
    InvalidName,
    InvalidPath,
    AlreadyExists,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum IconSubcategory {
    GenerationFailed,
    SaveFailed,
    InvalidFormat,
    InvalidSize,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum ConnectionSubcategory {
    ConnectionFailed,
    Timeout,
    Refused,
    ProtocolError,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum ValidationSubcategory {
    InvalidFormat,
    MissingRequired,
    InvalidRange,
    InvalidType,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum AuthSubcategory {
    InvalidCredentials,
    TokenExpired,
    AccountLocked,
    PermissionDenied,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum UnknownSubcategory {
    Unexpected,
    System,
    External,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum EncryptionSubcategory {
    DecryptionFailed,
    EncryptionFailed,
    InvalidKey,
    InvalidFormat,
    KeyNotInitialized,
    SerializationFailed,
    DeserializationFailed,
    Base64DecodeFailed,
    Utf8DecodeFailed,
    KeyInitialization,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub enum KeyManagementSubcategory {
    KeyNotInitialized,
    KeyNotFound,
    KeyGenerationFailed,
    KeyStorageFailed,
    KeyRetrievalFailed,
} 