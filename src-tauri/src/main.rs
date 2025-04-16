// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod database;
mod error;

use database::{Database, Project};
use error::{AppError, AppResult};
use std::sync::Arc;
use tauri::State;
use tracing::{info, error, Level};
use tracing_subscriber::FmtSubscriber;

struct AppState {
    db: Arc<Database>,
}

#[tauri::command]
async fn get_user_projects(
    user_id: String,
    state: State<'_, AppState>,
) -> AppResult<Vec<Project>> {
    info!("Fetching projects for user: {}", user_id);
    state
        .db
        .get_user_projects(&user_id)
        .map_err(AppError::from)
}

#[tauri::command]
async fn create_project(
    name: String,
    description: Option<String>,
    user_id: String,
    state: State<'_, AppState>,
) -> AppResult<i64> {
    info!("Creating new project '{}' for user: {}", name, user_id);
    state
        .db
        .create_project(&name, description.as_deref(), &user_id)
        .map_err(AppError::from)
}

fn setup_logging() {
    let subscriber = FmtSubscriber::builder()
        .with_max_level(Level::INFO)
        .with_target(false)
        .with_thread_ids(true)
        .with_file(true)
        .with_line_number(true)
        .pretty()
        .init();
}

fn main() {
    setup_logging();
    info!("Starting Dewey application...");

    let app_dir = dirs::data_local_dir()
        .ok_or_else(|| AppError::Config("Failed to get local data directory".into()))
        .unwrap()
        .join("dewey");
    
    info!("Using application directory: {:?}", app_dir);
    
    let db = match Database::new(&app_dir) {
        Ok(db) => db,
        Err(e) => {
            error!("Failed to initialize database: {}", e);
            panic!("Failed to initialize database: {}", e);
        }
    };

    let app_state = AppState {
        db: Arc::new(db),
    };

    info!("Initializing Tauri application...");
    
    tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_opener::init())
        .manage(app_state)
        .invoke_handler(tauri::generate_handler![get_user_projects, create_project])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
