use std::path::PathBuf;
use std::time::{SystemTime, UNIX_EPOCH};
use tauri::http::Response;
use tracing::{debug, info};
use tracing_subscriber::FmtSubscriber;
use directories::ProjectDirs;
use blake3;
use hex;

use crate::constants;
use crate::error::AppError;

/// Get the application data directory
pub fn get_app_dir() -> Result<PathBuf, AppError> {
    ProjectDirs::from(constants::APP_COMPANY, constants::APP_NAME, constants::APP_QUALIFIER)
        .ok_or_else(|| AppError::Config("Failed to get app data directory".into()))
        .map(|dirs| dirs.data_dir().to_path_buf())
}

/// Set up the logging system with appropriate configuration
pub fn setup_logging() {
    FmtSubscriber::builder()
        .with_max_level(constants::DEFAULT_LOG_LEVEL)
        .with_target(false)
        .with_thread_ids(true)
        .with_file(true)
        .with_line_number(true)
        .pretty()
        .init();
    
    info!("Logging system initialized");
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

/// Ensures a directory exists, creating it if necessary
pub fn ensure_dir_exists(path: &PathBuf) -> Result<(), AppError> {
    if !path.exists() {
        debug!("Creating directory: {:?}", path);
        std::fs::create_dir_all(path).map_err(AppError::Io)?;
    }
    Ok(())
}
