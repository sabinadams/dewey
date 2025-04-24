use serde::Serialize;

#[derive(Debug, Serialize)]
pub enum DatabaseSubcategory {
    ConnectionFailed,
    QueryFailed,
    TransactionFailed,
    ConstraintViolation,
    InvalidData,
}

#[derive(Debug, Serialize)]
pub enum MigrationSubcategory {
    VersionConflict,
    SchemaError,
    DataError,
    RollbackFailed,
}

#[derive(Debug, Serialize)]
pub enum IoSubcategory {
    ReadFailed,
    WriteFailed,
    PermissionDenied,
    PathNotFound,
    AlreadyExists,
}

#[derive(Debug, Serialize)]
pub enum ConfigSubcategory {
    ParseError,
    ValidationError,
    MissingRequired,
    InvalidFormat,
}

#[derive(Debug, Serialize)]
pub enum IconGenerationSubcategory {
    GenerationFailed,
    SaveFailed,
    InvalidFormat,
    InvalidSize,
}

#[derive(Debug, Serialize)]
pub enum ImageSubcategory {
    ProcessingFailed,
    InvalidFormat,
    InvalidSize,
    SaveFailed,
}

#[derive(Debug, Serialize)]
pub enum FileNotFoundSubcategory {
    ResourceNotFound,
    ConfigNotFound,
    AssetNotFound,
    DatabaseNotFound,
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
    InvalidLength,
}

#[derive(Debug, Serialize)]
pub enum ProjectSubcategory {
    NotFound,
    InvalidName,
    InvalidPath,
    AlreadyExists,
}

#[derive(Debug, Serialize)]
pub enum IconSubcategory {
    GenerationFailed,
    SaveFailed,
    InvalidFormat,
    InvalidSize,
}

#[derive(Debug, Serialize)]
pub enum ConnectionSubcategory {
    ConnectionFailed,
    Timeout,
    Refused,
    ProtocolError,
}

#[derive(Debug, Serialize)]
pub enum ValidationSubcategory {
    InvalidFormat,
    MissingRequired,
    InvalidRange,
    InvalidType,
}

#[derive(Debug, Serialize)]
pub enum AuthSubcategory {
    InvalidCredentials,
    TokenExpired,
    AccountLocked,
    PermissionDenied,
}

#[derive(Debug, Serialize)]
pub enum UnknownSubcategory {
    Unexpected,
    System,
    External,
}

#[derive(Debug, Serialize)]
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

#[derive(Debug, Clone, PartialEq)]
pub enum KeyManagementSubcategory {
    KeyNotInitialized,
    KeyNotFound,
    KeyGenerationFailed,
    KeyStorageFailed,
    KeyRetrievalFailed,
} 