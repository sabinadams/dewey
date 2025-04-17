use crate::AppState;
use tauri::State;
use tracing::info;

/// Command to get the application data directory
#[tauri::command]
pub async fn get_app_dir(
    _state: State<'_, AppState>,
) -> Result<String, String> {
    info!("Getting application data directory");
    
    // Use the path from LocalStorage's APP_DIR if available
    let app_dir = crate::storage::LocalStorage::get_app_dir();
    
    Ok(app_dir.to_string_lossy().to_string())
} 