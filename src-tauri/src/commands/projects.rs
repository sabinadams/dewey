use crate::services::storage::repositories::projects::{Project, ProjectRepository};
use crate::services::storage::icon::IconGenerator;
use crate::AppState;
use crate::utils;
use crate::constants;
use tauri::State;
use tracing::{info, error};
use blake3;

/// Command to fetch all projects for a user
#[tauri::command]
pub async fn get_user_projects(
    user_id: String,
    state: State<'_, AppState>,
) -> Result<Vec<Project>, String> {
    info!("Fetching projects for user: {}", user_id);
    
    let project_repo = ProjectRepository::new(state.db.clone());
    
    project_repo.get_by_user(&user_id)
        .await
        .map_err(|e| {
            error!("Failed to fetch projects: {}", e);
            e.to_string()
        })
}

/// Command to create a new project
#[tauri::command]
pub async fn create_project(
    name: String,
    user_id: String,
    state: State<'_, AppState>,
) -> Result<i64, String> {
    info!("Creating new project '{}' for user: {}", name, user_id);
    
    // Generate a unique hash for the icon
    let hash = blake3::hash(utils::generate_unique_hash(&[&name, &user_id]).as_bytes());
    
    // Create and save the icon
    let icon_generator = IconGenerator::new()
        .map_err(|e| {
            error!("Failed to create icon generator: {}", e);
            e.to_string()
        })?;
    
    let icon_path = icon_generator
        .generate_and_save(hash.as_bytes())
        .map_err(|e| {
            error!("Failed to generate icon: {}", e);
            e.to_string()
        })?;
    
    // Create the project with the icon path
    let project_repo = ProjectRepository::new(state.db.clone());
    
    project_repo.create(&name, &user_id, Some(&icon_path))
        .await
        .map_err(|e| {
            error!("Failed to create project: {}", e);
            e.to_string()
        })
}

/// Command to update a project's name
#[tauri::command]
pub async fn update_project(
    id: i64,
    name: String,
    user_id: String,
    state: State<'_, AppState>,
) -> Result<(), String> {
    info!("Updating project {} for user: {}", id, user_id);
    
    let project_repo = ProjectRepository::new(state.db.clone());
    
    // First check if the project exists and belongs to the user
    let exists = project_repo.exists(id, &user_id)
        .await
        .map_err(|e| {
            error!("Failed to check project existence: {}", e);
            e.to_string()
        })?;
    
    if !exists {
        return Err(constants::PROJECT_NOT_FOUND.into());
    }
    
    // Update the project
    project_repo.update(id, &name)
        .await
        .map_err(|e| {
            error!("Failed to update project: {}", e);
            e.to_string()
        })
}

/// Command to delete a project
#[tauri::command]
pub async fn delete_project(
    id: i64,
    user_id: String,
    state: State<'_, AppState>,
) -> Result<(), String> {
    info!("Deleting project {} for user: {}", id, user_id);
    
    let project_repo = ProjectRepository::new(state.db.clone());
    
    // First check if the project exists and belongs to the user
    let exists = project_repo.exists(id, &user_id)
        .await
        .map_err(|e| {
            error!("Failed to check project existence: {}", e);
            e.to_string()
        })?;
    
    if !exists {
        return Err(constants::PROJECT_NOT_FOUND.into());
    }
    
    // Delete the project
    project_repo.delete(id)
        .await
        .map_err(|e| {
            error!("Failed to delete project: {}", e);
            e.to_string()
        })
} 