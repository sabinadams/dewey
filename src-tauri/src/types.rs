use std::result::Result;

/// Application-wide Result type
pub type AppResult<T> = Result<T, Box<dyn std::error::Error>>; 