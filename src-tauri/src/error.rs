use thiserror::Error;
use std::path::PathBuf;
use std::fmt;

/// Trait for error categories
pub trait ErrorCategory: fmt::Display {
    fn category_name(&self) -> &'static str;
}

/// Main error type for the application
#[derive(Error, Debug)]
pub enum AppError {
    #[error("Database error: {0}")]
    Database(#[from] sqlx::Error),

    #[error("Migration error: {0}")]
    Migration(String),

    #[error("IO error: {0}")]
    Io(#[from] std::io::Error),

    #[error("Configuration error: {0}")]
    Config(String),

    #[error("Icon generation error: {0}")]
    IconGeneration(String),

    #[error("Image error: {0}")]
    Image(String),

    #[error("File not found: {0}")]
    FileNotFound(String),

    #[error("Keyring error: {0}")]
    Keyring(String),

    #[error("Key generation error: {0}")]
    KeyGeneration(String),

    #[error("Project error: {0}")]
    Project(String),

    #[error("Icon error: {0}")]
    Icon(String),

    #[error("Connection error: {0}")]
    Connection(String),

    #[error("Validation error: {0}")]
    Validation(String),

    #[error("Authentication error: {0}")]
    Auth(String),

    #[error("Unknown error: {0}")]
    Unknown(String),
}

impl ErrorCategory for AppError {
    fn category_name(&self) -> &'static str {
        match self {
            AppError::Database(_) => "DATABASE",
            AppError::Migration(_) => "MIGRATION",
            AppError::Io(_) => "IO",
            AppError::Config(_) => "CONFIG",
            AppError::IconGeneration(_) => "ICON_GENERATION",
            AppError::Image(_) => "IMAGE",
            AppError::FileNotFound(_) => "FILE_NOT_FOUND",
            AppError::Keyring(_) => "KEYRING",
            AppError::KeyGeneration(_) => "KEY_GENERATION",
            AppError::Project(_) => "PROJECT",
            AppError::Icon(_) => "ICON",
            AppError::Connection(_) => "CONNECTION",
            AppError::Validation(_) => "VALIDATION",
            AppError::Auth(_) => "AUTH",
            AppError::Unknown(_) => "UNKNOWN",
        }
    }
}

// Implement From for common error types
impl From<String> for AppError {
    fn from(err: String) -> Self {
        Self::Unknown(err)
    }
}

impl From<image::ImageError> for AppError {
    fn from(err: image::ImageError) -> Self {
        Self::Image(err.to_string())
    }
}

// Helper function to create error responses
pub fn create_error_response(error: AppError) -> serde_json::Value {
    serde_json::json!({
        "category": error.category_name(),
        "message": error.to_string(),
        "details": null
    })
} 