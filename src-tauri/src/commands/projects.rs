use crate::services::storage::{
    icon::IconGenerator,
    repositories::{
        connections::{NewConnection, ConnectionRepository, Connection},
        projects::{Project, ProjectRepository},
    },
};
use crate::utils;
use crate::state::AppState;
use crate::error::{AppError, AppResult, ErrorSeverity};
use crate::error::categories::{
    ProjectSubcategory, DatabaseSubcategory, IconSubcategory, ConnectionSubcategory,
    ErrorCategory
};
use blake3;
use tauri::State;
use tracing::info;
use snafu::ResultExt;

/// Command to fetch all projects for a user
///
/// # Errors
/// Returns a string error if there was a problem accessing the database or the projects could not be retrieved
#[tauri::command]
pub async fn get_user_projects(
    user_id: String,
    state: State<'_, AppState>,
) -> AppResult<Vec<Project>> {
    info!("Fetching projects for user: {}", user_id);

    let project_repo = ProjectRepository::new(state.db.clone());

    project_repo.get_by_user(&user_id).await
        .context(AppError::new(
            format!("Failed to fetch projects for user {}", user_id),
            ErrorCategory::Database(DatabaseSubcategory::QueryFailed),
            ErrorSeverity::Error,
        ))
}

/// Command to create a new project
///
/// # Errors
/// Returns a string error if:
/// - The icon generator fails to initialize
/// - The icon fails to generate or save
/// - The image data could not be decoded (if custom icon is provided)
/// - There was a problem creating the project in the database
#[tauri::command]
pub async fn create_project(
    name: String,
    user_id: String,
    custom_icon_data: Option<String>,
    initial_connection: Option<NewConnection>,
    state: State<'_, AppState>,
) -> AppResult<i64> {
    info!("Creating new project '{}' for user: {}", name, user_id);

    // Create the icon generator
    let icon_generator = IconGenerator::new()
        .context(AppError::new(
            "Failed to initialize icon generator",
            ErrorCategory::Icon(IconSubcategory::GenerationFailed),
            ErrorSeverity::Error,
        ))?;

    let final_icon_path = if let Some(icon_data) = custom_icon_data {
        info!("Using custom icon for project");

        // Use the helper function to save the custom icon
        icon_generator
            .save_custom_icon(&icon_data, &name, &user_id)
            .context(AppError::new(
                "Failed to save custom icon",
                ErrorCategory::Icon(IconSubcategory::SaveFailed),
                ErrorSeverity::Error,
            ))?
    } else {
        // Generate a default icon
        info!("Generating default icon for project");

        // Generate a unique hash for the icon
        let hash = blake3::hash(utils::generate_unique_hash(&[&name, &user_id]).as_bytes());

        icon_generator
            .generate_and_save(hash.as_bytes())
            .context(AppError::new(
                "Failed to generate default icon",
                ErrorCategory::Icon(IconSubcategory::GenerationFailed),
                ErrorSeverity::Error,
            ))?
    };

    // Start a transaction
    let mut tx = state.db.begin().await
        .map_err(|e| AppError::new(
            format!("Failed to start transaction: {}", e),
            ErrorCategory::Database(DatabaseSubcategory::TransactionFailed),
            ErrorSeverity::Error,
        ))?;

    // Create the project with the icon path
    let project_repo = ProjectRepository::new(state.db.clone());
    let connection_repo = ConnectionRepository::new(state.db.clone());

    // Create the project first
    let project_id = match project_repo
        .create(
            &name,
            &user_id,
            Some(&final_icon_path),
            Some(&mut tx),
        )
        .await
    {
        Ok(id) => id,
        Err(e) => {
            // Clean up the icon file
            let icon_path = icon_generator.get_icon_path(&final_icon_path);
            if let Err(cleanup_err) = std::fs::remove_file(&icon_path) {
                info!("Failed to clean up icon file: {}", cleanup_err);
            }
            return Err(e.into());
        }
    };

    // If an initial connection was provided, create it
    if let Some(initial_connection) = initial_connection {
        info!("Creating initial connection for project {}", project_id);
        let connection = NewConnection {
            connection_name: initial_connection.connection_name,
            project_id: Some(project_id),
            db_type: initial_connection.db_type,
            host: initial_connection.host,
            port: initial_connection.port,
            username: initial_connection.username,
            password: initial_connection.password,
            database: initial_connection.database
        };

        if let Err(e) = connection_repo.create(&connection, Some(&mut tx)).await {
            // Clean up the icon file
            let icon_path = icon_generator.get_icon_path(&final_icon_path);
            if let Err(cleanup_err) = std::fs::remove_file(&icon_path) {
                info!("Failed to clean up icon file: {}", cleanup_err);
            }
            return Err(e.into());
        }
    }

    // Commit the transaction
    if let Err(e) = tx.commit().await {
        // Clean up the icon file
        let icon_path = icon_generator.get_icon_path(&final_icon_path);
        if let Err(cleanup_err) = std::fs::remove_file(&icon_path) {
            info!("Failed to clean up icon file: {}", cleanup_err);
        }
        return Err(AppError::new(
            format!("Failed to commit transaction: {}", e),
            ErrorCategory::Database(DatabaseSubcategory::TransactionFailed),
            ErrorSeverity::Error,
        ));
    }

    Ok(project_id)
}

/// Command to get all connections for a project
///
/// # Errors
/// Returns a string error if there was a problem accessing the database
#[tauri::command]
pub async fn get_project_connections(
    project_id: i64,
    state: State<'_, AppState>,
) -> AppResult<Vec<Connection>> {
    info!("Fetching connections for project: {}", project_id);

    let connection_repo = ConnectionRepository::new(state.db.clone());

    connection_repo.get_by_project(project_id).await
        .context(AppError::new(
            "Failed to get project connections",
            ErrorCategory::Database(DatabaseSubcategory::QueryFailed),
            ErrorSeverity::Error,
        ))
}