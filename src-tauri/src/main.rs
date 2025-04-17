// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use dewey_lib::{
    commands,
    state,
};
use tracing::{info, error, Level};
use tracing_subscriber::FmtSubscriber;

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

#[tokio::main]
async fn main() {
    // Initialize logging first
    setup_logging();
    info!("Starting Dewey application...");

    // Initialize app state
    let app_state = match state::initialize_app_state().await {
        Ok(state) => state,
        Err(e) => {
            error!("Failed to initialize application state: {}", e);
            panic!("Failed to initialize application state: {}", e);
        }
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
            commands::delete_project,
            commands::get_app_dir
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
