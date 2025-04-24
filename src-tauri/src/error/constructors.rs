use super::types::{AppError, ErrorSeverity};
use super::categories::{ErrorCategory, *};

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