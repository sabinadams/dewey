use crate::database::Project;
use crate::AppState;
use tauri::State;
use tracing::info;

#[tauri::command]
pub async fn get_user_projects(
    user_id: String,
    state: State<'_, AppState>,
) -> Result<Vec<Project>, String> {
    info!("Fetching projects for user: {}", user_id);
    state
        .db
        .get_user_projects(&user_id)
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
    state
        .db
        .create_project(&name, &user_id)
        .await
        .map_err(|e| e.to_string())
} 