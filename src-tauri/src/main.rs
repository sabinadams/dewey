// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod database;

use database::{Database, Project, DatabaseError};
use std::sync::Arc;
use std::path::PathBuf;
use tauri::State;
use tauri::Manager;

struct AppState {
    db: Arc<Database>,
}

#[tauri::command]
async fn get_user_projects(
    user_id: String,
    state: State<'_, AppState>,
) -> Result<Vec<Project>, String> {
    state
        .db
        .get_user_projects(&user_id)
        .map_err(|e| e.to_string())
}

#[tauri::command]
async fn create_project(
    name: String,
    description: Option<String>,
    user_id: String,
    state: State<'_, AppState>,
) -> Result<i64, String> {
    state
        .db
        .create_project(&name, description.as_deref(), &user_id)
        .map_err(|e| e.to_string())
}

fn main() {
    let app_dir = dirs::data_local_dir()
        .expect("Failed to get local data directory")
        .join("dewey");
    
    let db = Database::new(&app_dir).expect("Failed to initialize database");
    let app_state = AppState {
        db: Arc::new(db),
    };

    tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_opener::init())
        .manage(app_state)
        .invoke_handler(tauri::generate_handler![get_user_projects, create_project])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
