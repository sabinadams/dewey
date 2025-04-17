use crate::storage::repositories::projects::{self, Project};
use crate::storage::icon::IconGenerator;
use crate::AppState;
use tauri::State;
use tracing::info;
use std::time::{SystemTime, UNIX_EPOCH};
use blake3;

#[tauri::command]
pub async fn get_user_projects(
    user_id: String,
    state: State<'_, AppState>,
) -> Result<Vec<Project>, String> {
    info!("Fetching projects for user: {}", user_id);
    projects::get_by_user(&state.db, &user_id)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn create_project(
    name: String,
    user_id: String,
    state: State<'_, AppState>,
) -> Result<i64, String> {
    info!("Creating new project '{}' for user: {}", name, user_id);
    // Create and save the icon
    let icon_generator = IconGenerator::new()
        .map_err(|e| e.to_string())?;
    
    // Generate a unique ID using blake3 hash of relevant data
    let timestamp = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap_or_default()
        .as_nanos()
        .to_string();
    
    // Combine timestamp, name and user_id for uniqueness
    let seed_string = format!("{}:{}:{}", timestamp, name, user_id);
    let hash = blake3::hash(seed_string.as_bytes());
    
    let icon_path = icon_generator
        .generate_and_save(hash.as_bytes())
        .map_err(|e| e.to_string())?;
    
    // Create the project with the icon path
    projects::create(&state.db, &name, &user_id, Some(&icon_path))
        .await
        .map_err(|e| e.to_string())
} 