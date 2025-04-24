//! Global constants for the application.
//! 
//! This module defines constants used throughout the application, including
//! application identifiers, file paths, configuration values, and error messages.

use tracing::Level;
use sqlx::sqlite::SqliteJournalMode;

/// Application identifiers
pub mod app {
    /// Company identifier for the application
    pub const COMPANY: &str = "com";
    /// Name of the application
    pub const NAME: &str = "dewey";
    /// Qualifier for the application
    pub const QUALIFIER: &str = "app";
}

/// Onboarding version - increment this when onboarding content changes
pub const ONBOARDING_VERSION: i32 = 1;

/// File and directory names
pub mod files {
    /// Name of the database file
    pub const DB_FILENAME: &str = "dewey.db";
    /// Name of the icons directory
    pub const ICONS_DIR: &str = "icons";
}

/// SQLite configuration
pub mod sqlite {
    use super::SqliteJournalMode;
    /// Default journal mode for SQLite
    pub const DEFAULT_JOURNAL_MODE: SqliteJournalMode = SqliteJournalMode::Wal;
    /// URI prefix for SQLite connections
    pub const URI_PREFIX: &str = "sqlite://";
}

/// Logging levels
pub mod logging {
    use super::Level;
    /// Default log level for the application
    pub const DEFAULT_LOG_LEVEL: Level = Level::INFO;
}

/// Content types
pub mod content {
    /// MIME type for PNG images
    pub const PNG: &str = "image/png";
    /// MIME type for plain text
    pub const TEXT: &str = "text/plain";
    /// MIME type for SVG images
    pub const SVG: &str = "image/svg+xml";
}

/// Cache control
pub mod cache {
    /// Cache control header for icons
    pub const ICON: &str = "public, max-age=31536000";
}

/// Error messages
pub mod errors {
    /// Error message for uninitialized app directory
    pub const APP_DIR_NOT_INITIALIZED: &str = "App directory not initialized";
    /// Error message for invalid file path
    pub const INVALID_FILE_PATH: &str = "Invalid file path";
    /// Error message for icon not found
    pub const ICON_NOT_FOUND: &str = "Icon not found";
    /// Error message for server error
    pub const SERVER_ERROR: &str = "Server error";
}

/// Key management
pub mod keys {
    /// Name of the key service
    pub const SERVICE_NAME: &str = "dewey";
    /// Name of the key account
    pub const ACCOUNT_NAME: &str = "encryption_key";
    /// Name of the key file
    pub const FILE_NAME: &str = "encryption.key";
}
