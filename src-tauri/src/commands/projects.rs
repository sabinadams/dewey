use crate::services::storage::{
    icon::IconGenerator,
    repositories::{
        connections::{NewConnection, ConnectionRepository, Connection},
        projects::{Project, ProjectRepository},
    },
};
use crate::utils;
use crate::state::AppState;
use crate::error::{ErrorCategory, ErrorSeverity};
use crate::error::categories::{ProjectSubcategory, DatabaseSubcategory, IconSubcategory, ConnectionSubcategory};
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
) -> Result<Vec<Project>, ErrorCategory> {
    info!("Fetching projects for user: {}", user_id);

    let project_repo = ProjectRepository::new(state.db.clone());

    project_repo.get_by_user(&user_id).await
        .context(ErrorCategory::Database {
            message: format!("Failed to fetch projects for user {}", user_id),
            subcategory: Some(DatabaseSubcategory::QueryFailed),
            code: 1000,
            severity: ErrorSeverity::Error,
        })
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
) -> Result<i64, ErrorCategory> {
    info!("Creating new project '{}' for user: {}", name, user_id);

    // Create the icon generator
    let icon_generator = IconGenerator::new()
        .context(ErrorCategory::Icon {
            message: "Failed to initialize icon generator".to_string(),
            subcategory: Some(IconSubcategory::GenerationFailed),
            code: 9500,
            severity: ErrorSeverity::Error,
        })?;

    let final_icon_path = if let Some(icon_data) = custom_icon_data {
        info!("Using custom icon for project");

        // Use the helper function to save the custom icon
        icon_generator
            .save_custom_icon(&icon_data, &name, &user_id)
            .context(ErrorCategory::Icon {
                message: "Failed to save custom icon".to_string(),
                subcategory: Some(IconSubcategory::SaveFailed),
                code: 9500,
                severity: ErrorSeverity::Error,
            })?
    } else {
        // Generate a default icon
        info!("Generating default icon for project");

        // Generate a unique hash for the icon
        let hash = blake3::hash(utils::generate_unique_hash(&[&name, &user_id]).as_bytes());

        icon_generator
            .generate_and_save(hash.as_bytes())
            .context(ErrorCategory::Icon {
                message: "Failed to generate default icon".to_string(),
                subcategory: Some(IconSubcategory::GenerationFailed),
                code: 9500,
                severity: ErrorSeverity::Error,
            })?
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
        .context(ErrorCategory::Project {
            message: "Failed to create project".to_string(),
            subcategory: Some(ProjectSubcategory::InvalidPath),
            code: 9000,
            severity: ErrorSeverity::Error,
        })?;

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
            .context(ErrorCategory::Connection {
                message: "Failed to create initial connection for project".to_string(),
                subcategory: Some(ConnectionSubcategory::ConnectionFailed),
                code: 10000,
                severity: ErrorSeverity::Error,
            })?;
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
) -> Result<(), ErrorCategory> {
    info!("Updating project {} for user: {}", id, user_id);

    let project_repo = ProjectRepository::new(state.db.clone());

    // First check if the project exists and belongs to the user
    if !project_repo
        .exists(id, &user_id)
        .await
        .context(ErrorCategory::Database {
            message: format!("Failed to check project existence for project {}", id),
            subcategory: Some(DatabaseSubcategory::QueryFailed),
            code: 1000,
            severity: ErrorSeverity::Error,
        })?
    {
        return Err(ErrorCategory::Project {
            message: "Project not found".to_string(),
            subcategory: Some(ProjectSubcategory::NotFound),
            code: 9000,
            severity: ErrorSeverity::Error,
        });
    }

    // Update the project
    project_repo.update(id, &name).await
        .context(ErrorCategory::Project {
            message: "Failed to update project".to_string(),
            subcategory: Some(ProjectSubcategory::InvalidName),
            code: 9000,
            severity: ErrorSeverity::Error,
        })
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
) -> Result<(), ErrorCategory> {
    info!("Deleting project {} for user: {}", id, user_id);

    let project_repo = ProjectRepository::new(state.db.clone());

    // First check if the project exists and belongs to the user
    if !project_repo
        .exists(id, &user_id)
        .await
        .context(ErrorCategory::Database {
            message: format!("Failed to check project existence for project {}", id),
            subcategory: Some(DatabaseSubcategory::QueryFailed),
            code: 1000,
            severity: ErrorSeverity::Error,
        })?
    {
        return Err(ErrorCategory::Project {
            message: "Project not found".to_string(),
            subcategory: Some(ProjectSubcategory::NotFound),
            code: 9000,
            severity: ErrorSeverity::Error,
        });
    }

    // Delete the project
    project_repo.delete(id).await
        .context(ErrorCategory::Database {
            message: "Failed to delete project".to_string(),
            subcategory: Some(DatabaseSubcategory::QueryFailed),
            code: 1000,
            severity: ErrorSeverity::Error,
        })
}

/// Command to get all connections for a project
///
/// # Errors
/// Returns a string error if there was a problem accessing the database
#[tauri::command]
pub async fn get_project_connections(
    project_id: i64,
    state: State<'_, AppState>,
) -> Result<Vec<Connection>, ErrorCategory> {
    info!("Fetching connections for project: {}", project_id);

    let connection_repo = ConnectionRepository::new(state.db.clone());

    connection_repo.get_by_project(project_id).await
        .context(ErrorCategory::Database {
            message: "Failed to get project connections".to_string(),
            subcategory: Some(DatabaseSubcategory::QueryFailed),
            code: 1000,
            severity: ErrorSeverity::Error,
        })
}