use crate::AppState;
use crate::services::storage::LocalStorage;
use crate::utils;
use tauri::State;
use tracing::info;

/// Command to get the application data directory
#[tauri::command]
pub async fn get_app_dir(
    _state: State<'_, AppState>,
) -> Result<String, String> {
    info!("Getting application data directory");
    
    // Try to get the app directory from the utility function first
    match utils::get_app_dir() {
        Ok(path) => Ok(path.to_string_lossy().to_string()),
        // Fallback to LocalStorage's static reference if app directory was already initialized
        Err(_) => {
            let app_dir = LocalStorage::get_app_dir();
            Ok(app_dir.to_string_lossy().to_string())
        }
    }
} 