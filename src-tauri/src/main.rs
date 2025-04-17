// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use dewey_lib::{
    commands,
    error::AppError,
    storage::LocalStorage,
    AppState,
};
use tracing::{info, error, Level};
use tracing_subscriber::FmtSubscriber;
use directories::ProjectDirs;
use std::path::PathBuf;

mod protocols;

/// Set up the logging system with appropriate configuration
fn setup_logging() {
    FmtSubscriber::builder()
        .with_max_level(Level::INFO)
        .with_target(false)
        .with_thread_ids(true)
        .with_file(true)
        .with_line_number(true)
        .pretty()
        .init();
}

/// Get the application data directory
fn get_app_dir() -> Result<PathBuf, AppError> {
    ProjectDirs::from("com", "dewey", "app")
        .ok_or_else(|| AppError::Config("Failed to get app data directory".into()))
        .map(|dirs| dirs.data_dir().to_path_buf())
}

#[tokio::main]
async fn main() {
    // Initialize logging first
    setup_logging();
    info!("Starting Dewey application...");

    // Get app directory
    let app_dir = match get_app_dir() {
        Ok(dir) => dir,
        Err(e) => {
            error!("Failed to determine app directory: {}", e);
            panic!("Failed to determine app directory: {}", e);
        }
    };
    
    // Ensure app directory exists
    if let Err(e) = std::fs::create_dir_all(&app_dir) {
        error!("Failed to create application directory: {}", e);
        panic!("Failed to create application directory: {}", e);
    }

    // Set up database
    let db_path = app_dir.join("dewey.db");
    info!("Using database at: {:?}", db_path);
    
    let storage = match LocalStorage::new(&db_path, app_dir).await {
        Ok(storage) => storage,
        Err(e) => {
            error!("Failed to initialize database: {}", e);
            panic!("Failed to initialize database: {}", e);
        }
    };

    // Create app state for dependency injection
    let app_state = AppState {
        db: storage.pool(),
    };

    info!("Initializing Tauri application...");
    
    // Build and run the Tauri application
    tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_opener::init())
        .register_uri_scheme_protocol("icon", protocols::icons::icon_protocol)
        .manage(app_state)
        .invoke_handler(tauri::generate_handler![
            commands::get_user_projects,
            commands::create_project,
            commands::update_project,
            commands::delete_project
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
