use tracing::Level;
use sqlx::sqlite::SqliteJournalMode;

// Application identifiers
pub const APP_COMPANY: &str = "com";
pub const APP_NAME: &str = "dewey";
pub const APP_QUALIFIER: &str = "app";

// Onboarding version - increment this when onboarding content changes
pub const ONBOARDING_VERSION: i32 = 1;

// File and directory names
pub const DB_FILENAME: &str = "dewey.db";
pub const ICONS_DIR: &str = "icons";

// SQLite configuration
pub const DEFAULT_JOURNAL_MODE: SqliteJournalMode = SqliteJournalMode::Wal;
pub const SQLITE_URI_PREFIX: &str = "sqlite://";

// Logging levels
pub const DEFAULT_LOG_LEVEL: Level = Level::INFO;

// Content types
pub const PNG_CONTENT_TYPE: &str = "image/png";
pub const TEXT_CONTENT_TYPE: &str = "text/plain";
pub const SVG_CONTENT_TYPE: &str = "image/svg+xml";

// Cache control
pub const ICON_CACHE_CONTROL: &str = "public, max-age=31536000";

// Error messages
pub const APP_DIR_NOT_INITIALIZED: &str = "App directory not initialized";
pub const INVALID_FILE_PATH: &str = "Invalid file path";
pub const ICON_NOT_FOUND: &str = "Icon not found";
pub const SERVER_ERROR: &str = "Server error";
pub const PROJECT_NOT_FOUND: &str = "Project not found or does not belong to user";

// Key management
pub const KEY_SERVICE_NAME: &str = "dewey";
pub const KEY_ACCOUNT_NAME: &str = "encryption_key";
pub const KEY_FILE_NAME: &str = "encryption.key";
