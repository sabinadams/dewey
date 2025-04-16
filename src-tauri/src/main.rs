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

#[tokio::main]
async fn main() {
    setup_logging();
    info!("Starting Dewey application...");

    let app_dir = dirs::data_local_dir()
        .ok_or_else(|| AppError::Config("Failed to get local data directory".into()))
        .unwrap()
        .join("dewey");
    
    std::fs::create_dir_all(&app_dir).unwrap();
    let db_path = app_dir.join("dewey.db");
    
    info!("Using database at: {:?}", db_path);
    
    let storage = match LocalStorage::new(&db_path).await {
        Ok(storage) => storage,
        Err(e) => {
            error!("Failed to initialize database: {}", e);
            panic!("Failed to initialize database: {}", e);
        }
    };

    let app_state = AppState {
        db: storage.pool(),
    };

    info!("Initializing Tauri application...");
    
    tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_opener::init())
        .manage(app_state)
        .invoke_handler(tauri::generate_handler![
            commands::get_user_projects,
            commands::create_project
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
