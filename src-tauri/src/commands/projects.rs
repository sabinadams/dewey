use crate::storage::repositories::projects::{self, Project};
use crate::storage::icon::IconGenerator;
use crate::AppState;
use tauri::State;
use tracing::info;

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
    
    // Generate a unique seed for the icon by combining the name and user_id
    let seed = format!("{}:{}", name, user_id);
    
    // Create and save the icon
    let icon_generator = IconGenerator::new()
        .map_err(|e| e.to_string())?;
    
    let icon_path = icon_generator
        .generate_and_save(seed.as_bytes())
        .map_err(|e| e.to_string())?;
    
    // Create the project with the icon path
    projects::create(&state.db, &name, &user_id, Some(&icon_path))
        .await
        .map_err(|e| e.to_string())
} 