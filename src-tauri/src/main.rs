// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use dewey_lib::{
    commands,
    state,
    utils,
    services,
};
use tracing::{info, error};

mod protocols;

#[tokio::main]
async fn main() {
    // Initialize logging first
    utils::setup_logging();
    info!("Starting Dewey application...");

    info!("Initializing encryption key...");
    // Initialize encryption key at startup
    services::encryption::initialize_encryption_key()
        .expect("Failed to initialize encryption key");

    // Initialize app state
    let app_state = state::initialize_app_state().await.unwrap_or_else(|e| {
        error!("Failed to initialize application state");
        if cfg!(debug_assertions) {
            panic!("Failed to initialize application state: {e}");
        } else {
            std::process::exit(1);
        }
    });

    info!("Initializing Tauri application...");
    
    // Build and run the Tauri application
    tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_opener::init())
        .register_uri_scheme_protocol("icon", protocols::icons::icon_protocol)
        .manage(app_state)
        .invoke_handler(tauri::generate_handler![
            commands::projects::create_project,
            commands::projects::get_user_projects,
            commands::projects::get_project_connections,
            commands::database::test_connection,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
