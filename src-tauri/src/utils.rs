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

/// Create a 404 Not Found response
pub fn response_not_found() -> Response<Vec<u8>> {
    debug!("Returning 404 Not Found response");
    Response::builder()
        .status(404)
        .header("Content-Type", constants::TEXT_CONTENT_TYPE)
        .body(constants::ICON_NOT_FOUND.as_bytes().to_vec())
        .unwrap_or_else(|_| Response::new(Vec::new()))
}

/// Create a 500 Server Error response
pub fn response_server_error() -> Response<Vec<u8>> {
    debug!("Returning 500 Server Error response");
    Response::builder()
        .status(500)
        .header("Content-Type", constants::TEXT_CONTENT_TYPE)
        .body(constants::SERVER_ERROR.as_bytes().to_vec())
        .unwrap_or_else(|_| Response::new(Vec::new()))
}

/// Ensures a directory exists, creating it if necessary
pub fn ensure_dir_exists(path: &PathBuf) -> Result<(), AppError> {
    if !path.exists() {
        debug!("Creating directory: {:?}", path);
        std::fs::create_dir_all(path).map_err(AppError::Io)?;
    }
    Ok(())
}
