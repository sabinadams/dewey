use thiserror::Error;
use std::path::PathBuf;

#[derive(Error, Debug)]
pub enum AppError {
    #[error("Database error: {0}")]
    Database(#[from] sqlx::Error),

    #[error("Migration error: {0}")]
    Migration(#[from] sqlx::migrate::MigrateError),

    #[error("IO error: {0}")]
    Io(#[from] std::io::Error),

    #[error("Configuration error: {0}")]
    Config(String),

    #[error("Icon generation error: {0}")]
    IconGeneration(String),

    #[error("Image processing error: {0}")]
    Image(String),

    #[error("File not found: {0}")]
    FileNotFound(PathBuf),

    #[error("Unknown error: {0}")]
    Unknown(String),
}

pub type AppResult<T> = Result<T, AppError>;

impl From<image::ImageError> for AppError {
    fn from(err: image::ImageError) -> Self {
        Self::Image(err.to_string())
    }
}

impl From<String> for AppError {
    fn from(err: String) -> Self {
        Self::Unknown(err)
    }
} 