// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use dewey_lib::{
    state,
    utils,
    commands,
    protocols,
};
use tracing::{info, error};

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
        // I hate this, but I don't know how to do it otherwise
        .invoke_handler(tauri::generate_handler![
            // Onboarding commands
            commands::onboarding::store_onboarding,
            commands::onboarding::should_run_onboarding,
            
            // Project commands
            commands::projects::create_project,
            commands::projects::get_user_projects,
            commands::projects::update_project,
            commands::projects::delete_project,
            commands::projects::get_project_connections,
            
            // Database commands
            commands::database::test_connection,

            // Encryption commands
            commands::keychain::initialize_encryption_key,
            commands::keychain::has_encryption_key,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
