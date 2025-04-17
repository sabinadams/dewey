use crate::AppState;
use crate::services::storage::LocalStorage;
use crate::utils;
use tauri::State;
use tracing::info;

/// Command to get the application data directory
///
/// # Errors
/// Returns a string error if the application data directory cannot be determined
/// or if there's an issue converting the path to a string.
#[tauri::command]
pub fn get_app_dir(
    _state: State<'_, AppState>,
) -> Result<String, String> {
    info!("Getting application data directory");
    
    // Try to get the app directory from utils first, fall back to LocalStorage
    let app_dir = utils::get_app_dir()
        .unwrap_or_else(|_| LocalStorage::get_app_dir().clone());
    
    Ok(app_dir.to_string_lossy().to_string())
} 