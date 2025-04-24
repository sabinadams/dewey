//! Utility functions for the application.
//! 
//! This module contains various utility functions used throughout the application,
//! including file system operations, logging setup, and response generation.

use std::path::PathBuf;
use std::time::{SystemTime, UNIX_EPOCH};
use tauri::http::Response;
use tracing::{info, debug};
use tracing_subscriber::FmtSubscriber;
use blake3;
use hex;
use directories::ProjectDirs;
use crate::constants;
use crate::error::{AppError, AppResult, ErrorSeverity, ErrorCategory};
use crate::error::categories::{ConfigSubcategory, IoSubcategory};

/// Get the application directory
///
/// # Errors
/// Returns an error if the application directory could not be determined
pub fn get_app_dir() -> AppResult<PathBuf> {
    ProjectDirs::from(constants::app::COMPANY, constants::app::NAME, constants::app::QUALIFIER)
        .ok_or_else(|| AppError::new(
            "Failed to get application directory",
            ErrorCategory::Config(ConfigSubcategory::NotFound),
            ErrorSeverity::Error
        ))
        .map(|dirs| dirs.config_dir().to_path_buf())
}

/// Set up logging for the application
///
/// Set up the logging system with appropriate configuration
pub fn setup_logging() -> AppResult<()> {
    FmtSubscriber::builder()
        .with_max_level(constants::DEFAULT_LOG_LEVEL)
        .with_target(false)
        .with_thread_ids(true)
        .with_file(true)
        .with_line_number(true)
        .pretty()
        .init();
    
    info!("Logging system initialized");
    Ok(())
}

/// Generate a unique hash from various inputs
///
/// # Examples
///
/// ```
/// use dewey_lib::utils::generate_unique_hash;
///
/// let components = vec!["user123", "project456"];
/// let hash = generate_unique_hash(&components);
/// assert_eq!(hash.len(), 16); // 8 bytes encoded as hex
/// ```
#[must_use]
pub fn generate_unique_hash(components: &[&str]) -> String {
    let timestamp = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap_or_default()
        .as_nanos()
        .to_string();
    
    let mut seed_string = components.join(":");
    seed_string.push(':');
    seed_string.push_str(&timestamp);
    
    let hash = blake3::hash(seed_string.as_bytes());
    hex::encode(&hash.as_bytes()[..8])
}

/// Create a response with specified status code and content
///
/// # Errors
/// Returns an empty response if the response could not be created
fn create_response(status: u16, body: &str) -> Response<Vec<u8>> {
    debug!("Creating response with status {}: {}", status, body);
    Response::builder()
        .status(status)
        .header("Content-Type", constants::content::TEXT)
        .body(body.as_bytes().to_vec())
        .unwrap_or_else(|_| Response::new(Vec::new()))
}

/// Create a 404 Not Found response
///
/// # Examples
///
/// ```
/// use dewey_lib::utils::response_not_found;
///
/// let response = response_not_found();
/// assert_eq!(response.status(), 404);
/// ```
#[must_use]
pub fn response_not_found() -> Response<Vec<u8>> {
    create_response(404, constants::errors::ICON_NOT_FOUND)
}

/// Create a 500 Server Error response
///
/// # Examples
///
/// ```
/// use dewey_lib::utils::response_server_error;
///
/// let response = response_server_error();
/// assert_eq!(response.status(), 500);
/// ```
#[must_use]
pub fn response_server_error() -> Response<Vec<u8>> {
    create_response(500, constants::errors::SERVER_ERROR)
}

/// Ensure a directory exists, creating it if necessary
///
/// # Arguments
/// * `path` - The path to the directory
///
/// # Errors
/// Returns an error if the directory could not be created
///
/// # Examples
///
/// ```
/// use std::path::PathBuf;
/// use dewey_lib::utils::ensure_dir_exists;
///
/// let path = PathBuf::from("/tmp/test_dir");
/// ensure_dir_exists(&path).unwrap();
/// assert!(path.exists());
/// ```
pub fn ensure_dir_exists(path: &PathBuf) -> AppResult<()> {
    if !path.exists() {
        debug!("Creating directory: {:?}", path);
        std::fs::create_dir_all(path).map_err(|e| AppError::new(
            e.to_string(),
            ErrorCategory::Io(IoSubcategory::CreateFailed),
            ErrorSeverity::Error
        ))?;
    }
    Ok(())
}
