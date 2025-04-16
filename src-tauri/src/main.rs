// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod database;
mod error;

use database::SqliteDatabase;
use error::{AppError, AppResult};
use std::sync::Arc;
use tracing::{info, error, Level};
use tracing_subscriber::FmtSubscriber;

pub struct AppState {
    db: Arc<SqliteDatabase>,
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
    
    let db = match SqliteDatabase::new(&app_dir) {
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
        .invoke_handler(tauri::generate_handler![
            commands::get_user_projects,
            commands::create_project
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
