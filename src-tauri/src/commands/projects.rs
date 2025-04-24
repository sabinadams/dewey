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

    // Create the project with the icon path
    let project_repo = ProjectRepository::new(state.db.clone());
    let connection_repo = ConnectionRepository::new(state.db.clone());

    // Create the project first
    let project_id = project_repo
        .create(
            &name,
            &user_id,
            Some(&final_icon_path),
        )
        .await
        .context(AppError::new(
            "Failed to create project",
            ErrorCategory::Project(ProjectSubcategory::InvalidPath),
            ErrorSeverity::Error,
        ))?;

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

        connection_repo.create(&connection).await
            .context(AppError::new(
                "Failed to create initial connection for project",
                ErrorCategory::Connection(ConnectionSubcategory::ConnectionFailed),
                ErrorSeverity::Error,
            ))?;
    }

    Ok(project_id)
}

/// Command to update a project's name
///
/// # Errors
/// Returns a string error if:
/// - The project doesn't exist or doesn't belong to the user
/// - There was a database error updating the project
#[tauri::command]
pub async fn update_project(
    id: i64,
    name: String,
    user_id: String,
    state: State<'_, AppState>,
) -> AppResult<()> {
    info!("Updating project {} for user: {}", id, user_id);

    let project_repo = ProjectRepository::new(state.db.clone());

    // First check if the project exists and belongs to the user
    if !project_repo
        .exists(id, &user_id)
        .await
        .context(AppError::new(
            format!("Failed to check project existence for project {}", id),
            ErrorCategory::Database(DatabaseSubcategory::QueryFailed),
            ErrorSeverity::Error,
        ))?
    {
        return Err(AppError::new(
            "Project not found",
            ErrorCategory::Project(ProjectSubcategory::NotFound),
            ErrorSeverity::Error,
        ));
    }

    // Update the project
    project_repo.update(id, &name).await
        .context(AppError::new(
            "Failed to update project",
            ErrorCategory::Project(ProjectSubcategory::InvalidName),
            ErrorSeverity::Error,
        ))
}

/// Command to delete a project
///
/// # Errors
/// Returns a string error if:
/// - The project doesn't exist or doesn't belong to the user
/// - There was a database error deleting the project
#[tauri::command]
pub async fn delete_project(
    id: i64,
    user_id: String,
    state: State<'_, AppState>,
) -> AppResult<()> {
    info!("Deleting project {} for user: {}", id, user_id);

    let project_repo = ProjectRepository::new(state.db.clone());

    // First check if the project exists and belongs to the user
    if !project_repo
        .exists(id, &user_id)
        .await
        .context(AppError::new(
            format!("Failed to check project existence for project {}", id),
            ErrorCategory::Database(DatabaseSubcategory::QueryFailed),
            ErrorSeverity::Error,
        ))?
    {
        return Err(AppError::new(
            "Project not found",
            ErrorCategory::Project(ProjectSubcategory::NotFound),
            ErrorSeverity::Error,
        ));
    }

    // Delete the project
    project_repo.delete(id).await
        .context(AppError::new(
            "Failed to delete project",
            ErrorCategory::Database(DatabaseSubcategory::QueryFailed),
            ErrorSeverity::Error,
        ))
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