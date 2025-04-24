use serde::{Serialize, Deserialize};
use snafu::Snafu;
use crate::error::categories::ErrorCategory;
/// Severity levels for errors
#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub enum ErrorSeverity {
    Info,
    Warning,
    Error,
    Critical,
}

/// The main error type for the application
#[derive(Debug, Snafu)]
pub struct AppError {
    pub message: String,
    pub category: ErrorCategory,
    pub severity: ErrorSeverity,
}

// Custom serialization for AppError
impl Serialize for AppError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        use serde::ser::SerializeStruct;
        
        let (category_str, subcategory_str) = match &self.category {
            ErrorCategory::Database(sub) => ("Database", format!("{:?}", sub)),
            ErrorCategory::Migration(sub) => ("Migration", format!("{:?}", sub)),
            ErrorCategory::Io(sub) => ("Io", format!("{:?}", sub)),
            ErrorCategory::Config(sub) => ("Config", format!("{:?}", sub)),
            ErrorCategory::IconGeneration(sub) => ("IconGeneration", format!("{:?}", sub)),
            ErrorCategory::Icon(sub) => ("Icon", format!("{:?}", sub)),
            ErrorCategory::Keyring(sub) => ("Keyring", format!("{:?}", sub)),
            ErrorCategory::KeyGeneration(sub) => ("KeyGeneration", format!("{:?}", sub)),
            ErrorCategory::Project(sub) => ("Project", format!("{:?}", sub)),
            ErrorCategory::Encryption(sub) => ("Encryption", format!("{:?}", sub)),
            ErrorCategory::KeyManagement(sub) => ("KeyManagement", format!("{:?}", sub)),
            ErrorCategory::Connection(sub) => ("Connection", format!("{:?}", sub)),
            ErrorCategory::Validation(sub) => ("Validation", format!("{:?}", sub)),
            ErrorCategory::Auth(sub) => ("Auth", format!("{:?}", sub)),
            ErrorCategory::Unknown(sub) => ("Unknown", format!("{:?}", sub)),
        };

        let mut state = serializer.serialize_struct("AppError", 4)?;
        state.serialize_field("message", &self.message)?;
        state.serialize_field("category", category_str)?;
        state.serialize_field("subcategory", &subcategory_str)?;
        state.serialize_field("severity", &self.severity)?;
        state.end()
    }
}

impl AppError {
    pub fn new(
        message: impl Into<String>,
        category: ErrorCategory,
        severity: ErrorSeverity,
    ) -> Self {
        Self {
            message: message.into(),
            category,
            severity,
        }
    }

    pub fn code(&self) -> u32 {
        // Generate a unique code based on category and subcategory
        let category_code = match self.category {
            ErrorCategory::Database(_) => 1000,
            ErrorCategory::Migration(_) => 2000,
            ErrorCategory::Io(_) => 3000,
            ErrorCategory::Config(_) => 4000,
            ErrorCategory::IconGeneration(_) => 5000,
            ErrorCategory::Icon(_) => 6000,
            ErrorCategory::Keyring(_) => 7000,
            ErrorCategory::KeyGeneration(_) => 8000,
            ErrorCategory::Project(_) => 9000,
            ErrorCategory::Encryption(_) => 10000,
            ErrorCategory::KeyManagement(_) => 11000,
            ErrorCategory::Connection(_) => 12000,
            ErrorCategory::Validation(_) => 13000,
            ErrorCategory::Auth(_) => 14000,
            ErrorCategory::Unknown(_) => 15000,
        };

        let subcategory_code = match &self.category {
            ErrorCategory::Database(sub) => *sub as u32,
            ErrorCategory::Migration(sub) => *sub as u32,
            ErrorCategory::Io(sub) => *sub as u32,
            ErrorCategory::Config(sub) => *sub as u32,
            ErrorCategory::IconGeneration(sub) => *sub as u32,
            ErrorCategory::Icon(sub) => *sub as u32,
            ErrorCategory::Keyring(sub) => *sub as u32,
            ErrorCategory::KeyGeneration(sub) => *sub as u32,
            ErrorCategory::Project(sub) => *sub as u32,
            ErrorCategory::Encryption(sub) => *sub as u32,
            ErrorCategory::KeyManagement(sub) => *sub as u32,
            ErrorCategory::Connection(sub) => *sub as u32,
            ErrorCategory::Validation(sub) => *sub as u32,
            ErrorCategory::Auth(sub) => *sub as u32,
            ErrorCategory::Unknown(sub) => *sub as u32,
        };

        category_code + subcategory_code
    }
}