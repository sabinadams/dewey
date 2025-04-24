use serde_json::Value;

/// Error message templates for the application
pub struct ErrorMessages;

impl ErrorMessages {
    // Database errors
    pub const DB_CONNECTION_FAILED: &'static str = "Failed to connect to database: {reason}";
    pub const DB_QUERY_FAILED: &'static str = "Database query failed: {query}";
    pub const DB_TRANSACTION_FAILED: &'static str = "Database transaction failed: {reason}";
    pub const DB_CONSTRAINT_VIOLATION: &'static str = "Database constraint violation: {constraint}";
    pub const DB_INVALID_DATA: &'static str = "Invalid data in database: {field}";

    // IO errors
    pub const IO_READ_FAILED: &'static str = "Failed to read from {path}: {reason}";
    pub const IO_WRITE_FAILED: &'static str = "Failed to write to {path}: {reason}";
    pub const IO_PERMISSION_DENIED: &'static str = "Permission denied for {path}";
    pub const IO_PATH_NOT_FOUND: &'static str = "Path not found: {path}";
    pub const IO_ALREADY_EXISTS: &'static str = "Path already exists: {path}";

    // Config errors
    pub const CONFIG_PARSE_ERROR: &'static str = "Failed to parse config: {reason}";
    pub const CONFIG_VALIDATION_ERROR: &'static str = "Config validation failed: {field}";
    pub const CONFIG_MISSING_REQUIRED: &'static str = "Missing required config: {field}";
    pub const CONFIG_INVALID_FORMAT: &'static str = "Invalid config format: {field}";

    // Icon generation errors
    pub const ICON_GENERATION_FAILED: &'static str = "Failed to generate icon: {reason}";
    pub const ICON_SAVE_FAILED: &'static str = "Failed to save icon: {path}";
    pub const ICON_INVALID_FORMAT: &'static str = "Invalid icon format: {format}";
    pub const ICON_INVALID_SIZE: &'static str = "Invalid icon size: {size}";

    // Image errors
    pub const IMAGE_PROCESSING_FAILED: &'static str = "Image processing failed: {reason}";
    pub const IMAGE_INVALID_FORMAT: &'static str = "Invalid image format: {format}";
    pub const IMAGE_INVALID_SIZE: &'static str = "Invalid image size: {size}";
    pub const IMAGE_SAVE_FAILED: &'static str = "Failed to save image: {path}";

    // File not found errors
    pub const FILE_RESOURCE_NOT_FOUND: &'static str = "Resource not found: {path}";
    pub const FILE_CONFIG_NOT_FOUND: &'static str = "Config file not found: {path}";
    pub const FILE_ASSET_NOT_FOUND: &'static str = "Asset not found: {path}";
    pub const FILE_DB_NOT_FOUND: &'static str = "Database file not found: {path}";

    // Keyring errors
    pub const KEYRING_ACCESS_DENIED: &'static str = "Access denied to keyring: {reason}";
    pub const KEYRING_KEY_NOT_FOUND: &'static str = "Key not found in keyring: {key}";
    pub const KEYRING_UNAVAILABLE: &'static str = "Keyring service unavailable: {reason}";
    pub const KEYRING_INVALID_KEY: &'static str = "Invalid key in keyring: {key}";

    // Key generation errors
    pub const KEY_GENERATION_FAILED: &'static str = "Failed to generate key: {reason}";
    pub const KEY_STORAGE_FAILED: &'static str = "Failed to store key: {reason}";
    pub const KEY_INVALID_LENGTH: &'static str = "Invalid key length: {length}";

    // Project errors
    pub const PROJECT_NOT_FOUND: &'static str = "Project not found: {id}";
    pub const PROJECT_INVALID_NAME: &'static str = "Invalid project name: {name}";
    pub const PROJECT_INVALID_PATH: &'static str = "Invalid project path: {path}";
    pub const PROJECT_ALREADY_EXISTS: &'static str = "Project already exists: {name}";

    // Connection errors
    pub const CONNECTION_FAILED: &'static str = "Connection failed: {reason}";
    pub const CONNECTION_TIMEOUT: &'static str = "Connection timeout: {timeout}";
    pub const CONNECTION_REFUSED: &'static str = "Connection refused: {reason}";
    pub const CONNECTION_PROTOCOL_ERROR: &'static str = "Protocol error: {reason}";

    // Validation errors
    pub const VALIDATION_INVALID_FORMAT: &'static str = "Invalid format: {field}";
    pub const VALIDATION_MISSING_REQUIRED: &'static str = "Missing required field: {field}";
    pub const VALIDATION_INVALID_RANGE: &'static str = "Invalid range for {field}: {value}";
    pub const VALIDATION_INVALID_TYPE: &'static str = "Invalid type for {field}: {type}";

    // Auth errors
    pub const AUTH_INVALID_CREDENTIALS: &'static str = "Invalid credentials";
    pub const AUTH_TOKEN_EXPIRED: &'static str = "Token expired";
    pub const AUTH_ACCOUNT_LOCKED: &'static str = "Account locked: {reason}";
    pub const AUTH_PERMISSION_DENIED: &'static str = "Permission denied: {resource}";

    // Encryption errors
    pub const ENCRYPTION_DECRYPTION_FAILED: &'static str = "Decryption failed: {reason}";
    pub const ENCRYPTION_ENCRYPTION_FAILED: &'static str = "Encryption failed: {reason}";
    pub const ENCRYPTION_INVALID_KEY: &'static str = "Invalid encryption key: {reason}";
    pub const ENCRYPTION_INVALID_FORMAT: &'static str = "Invalid encryption format: {format}";
    pub const ENCRYPTION_KEY_NOT_INITIALIZED: &'static str = "Encryption key not initialized";
    pub const ENCRYPTION_SERIALIZATION_FAILED: &'static str = "Serialization failed: {reason}";
    pub const ENCRYPTION_DESERIALIZATION_FAILED: &'static str = "Deserialization failed: {reason}";
    pub const ENCRYPTION_BASE64_DECODE_FAILED: &'static str = "Base64 decode failed: {reason}";
    pub const ENCRYPTION_UTF8_DECODE_FAILED: &'static str = "UTF-8 decode failed: {reason}";
    pub const ENCRYPTION_KEY_INITIALIZATION: &'static str = "Key initialization failed: {reason}";

    // Key management errors
    pub const KEY_MANAGEMENT_NOT_INITIALIZED: &'static str = "Key management not initialized";
    pub const KEY_MANAGEMENT_NOT_FOUND: &'static str = "Key not found: {key}";
    pub const KEY_MANAGEMENT_GENERATION_FAILED: &'static str = "Key generation failed: {reason}";
    pub const KEY_MANAGEMENT_STORAGE_FAILED: &'static str = "Key storage failed: {reason}";
    pub const KEY_MANAGEMENT_RETRIEVAL_FAILED: &'static str = "Key retrieval failed: {reason}";

    /// Format an error message with the given parameters
    pub fn format_message(template: &str, params: &Value) -> String {
        let mut message = template.to_string();
        
        if let Some(obj) = params.as_object() {
            for (key, value) in obj {
                let placeholder = format!("{{{}}}", key);
                if let Some(val_str) = value.as_str() {
                    message = message.replace(&placeholder, val_str);
                } else {
                    message = message.replace(&placeholder, &value.to_string());
                }
            }
        }
        
        message
    }
} 