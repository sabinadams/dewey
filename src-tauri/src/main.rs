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

mod protocols;

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

    let app_dir = ProjectDirs::from("com", "dewey", "dewey")
        .ok_or_else(|| AppError::Config("Failed to get app data directory".into()))
        .unwrap()
        .data_dir()
        .to_path_buf();
    
    if let Err(e) = std::fs::create_dir_all(&app_dir) {
        error!("Failed to create application directory: {}", e);
        panic!("Failed to create application directory: {}", e);
    }

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
        .register_uri_scheme_protocol("icon", protocols::icons::icon_protocol)
        .manage(app_state)
        .invoke_handler(tauri::generate_handler![
            commands::get_user_projects,
            commands::create_project
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
