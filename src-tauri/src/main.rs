// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use dewey_lib::{
    commands,
    state,
    utils,
};
use tracing::{info, error};

mod protocols;

#[tokio::main]
async fn main() {
    // Initialize logging first
    utils::setup_logging();
    info!("Starting Dewey application...");

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
            commands::get_user_projects,
            commands::create_project,
            commands::update_project,
            commands::delete_project,
            commands::get_app_dir
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
