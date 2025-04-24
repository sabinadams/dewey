use std::path::PathBuf;
use std::time::{SystemTime, UNIX_EPOCH};
use tauri::http::Response;
use tracing::{debug, info};
use tracing_subscriber::fmt;
use directories::ProjectDirs;
use blake3;
use hex;
use snafu::ResultExt;
use snafu::{Snafu, Backtrace, GenerateImplicitData};
use std::path::Path;
use std::fs;

use crate::constants;
use crate::error::ErrorCategory;
use crate::types::AppResult;

/// Get the application directory
///
/// # Errors
/// Returns an error if the application directory could not be determined
pub fn get_app_dir() -> Result<PathBuf, ErrorCategory> {
    ProjectDirs::from(constants::APP_COMPANY, constants::APP_NAME, constants::APP_QUALIFIER)
        .ok_or_else(|| ErrorCategory::Config {
            message: constants::APP_DIR_NOT_INITIALIZED.to_string(),
        })
        .map(|dirs| dirs.data_dir().to_path_buf())
}

/// Set up logging for the application
pub fn setup_logging() {
    fmt::init();
}

/// Generate a unique hash from various inputs
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
fn create_response(status: u16, body: &str) -> Response<Vec<u8>> {
    debug!("Creating response with status {}: {}", status, body);
    Response::builder()
        .status(status)
        .header("Content-Type", constants::TEXT_CONTENT_TYPE)
        .body(body.as_bytes().to_vec())
        .unwrap_or_else(|_| Response::new(Vec::new()))
}

/// Create a 404 Not Found response
#[must_use]
pub fn response_not_found() -> Response<Vec<u8>> {
    create_response(404, constants::ICON_NOT_FOUND)
}

/// Create a 500 Server Error response
#[must_use]
pub fn response_server_error() -> Response<Vec<u8>> {
    create_response(500, constants::SERVER_ERROR)
}

/// Ensure a directory exists, creating it if necessary
///
/// # Arguments
/// * `path` - The path to the directory
///
/// # Errors
/// Returns an error if the directory could not be created
pub fn ensure_dir_exists(path: &PathBuf) -> AppResult<()> {
    if !path.exists() {
        debug!("Creating directory: {:?}", path);
        std::fs::create_dir_all(path)?;
    }
    Ok(())
}
