use crate::{
    constants,
    services::storage::{
        icon::IconGenerator,
        repositories::{
            connections::{NewConnection, ConnectionRepository, Connection},
            projects::{Project, ProjectRepository},
        },
    },
    utils,
    AppState,
};
use blake3;
use tauri::State;
use tracing::{error, info};
use dewey_macros::command;

/// Command to fetch all projects for a user
///
/// # Errors
/// Returns a string error if there was a problem accessing the database or the projects could not be retrieved
#[command]
pub async fn get_user_projects(
    user_id: String,
    state: State<'_, AppState>,
) -> Result<Vec<Project>, String> {
    info!("Fetching projects for user: {}", user_id);

    let project_repo = ProjectRepository::new(state.db.clone());

    project_repo.get_by_user(&user_id).await.map_err(|e| {
        error!("Failed to fetch projects: {}", e);
        e.to_string()
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
#[command]
pub async fn create_project(
    name: String,
    user_id: String,
    custom_icon_data: Option<String>,
    initial_connection: Option<NewConnection>,
    state: State<'_, AppState>,
) -> Result<i64, String> {
    info!("Creating new project '{}' for user: {}", name, user_id);

    // Create the icon generator
    let icon_generator = IconGenerator::new().map_err(|e| {
        error!("Failed to create icon generator: {}", e);
        e.to_string()
    })?;

    let final_icon_path = if let Some(icon_data) = custom_icon_data {
        info!("Using custom icon for project");

        // Use the helper function to save the custom icon
        icon_generator
            .save_custom_icon(&icon_data, &name, &user_id)
            .map_err(|e| {
                error!("Failed to save custom icon: {}", e);
                e.to_string()
            })?
    } else {
        // Generate a default icon
        info!("Generating default icon for project");

        // Generate a unique hash for the icon
        let hash = blake3::hash(utils::generate_unique_hash(&[&name, &user_id]).as_bytes());

        icon_generator
            .generate_and_save(hash.as_bytes())
            .map_err(|e| {
                error!("Failed to generate default icon: {}", e);
                e.to_string()
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
        .map_err(|e| {
            error!("Failed to create project: {}", e);
            e.to_string()
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

        connection_repo.create(&connection).await.map_err(|e| {
            error!("Failed to create initial connection: {}", e);
            e.to_string()
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
#[command]
pub async fn update_project(
    id: i64,
    name: String,
    user_id: String,
    state: State<'_, AppState>,
) -> Result<(), String> {
    info!("Updating project {} for user: {}", id, user_id);

    let project_repo = ProjectRepository::new(state.db.clone());

    // First check if the project exists and belongs to the user
    if !project_repo
        .exists(id, &user_id)
        .await
        .map_err(|e| e.to_string())?
    {
        return Err(constants::PROJECT_NOT_FOUND.into());
    }

    // Update the project
    project_repo.update(id, &name).await.map_err(|e| {
        error!("Failed to update project: {}", e);
        e.to_string()
    })
}

/// Command to delete a project
///
/// # Errors
/// Returns a string error if:
/// - The project doesn't exist or doesn't belong to the user
/// - There was a database error deleting the project
#[command]
pub async fn delete_project(
    id: i64,
    user_id: String,
    state: State<'_, AppState>,
) -> Result<(), String> {
    info!("Deleting project {} for user: {}", id, user_id);

    let project_repo = ProjectRepository::new(state.db.clone());

    // First check if the project exists and belongs to the user
    if !project_repo
        .exists(id, &user_id)
        .await
        .map_err(|e| e.to_string())?
    {
        return Err(constants::PROJECT_NOT_FOUND.into());
    }

    // Delete the project
    project_repo.delete(id).await.map_err(|e| {
        error!("Failed to delete project: {}", e);
        e.to_string()
    })
}

/// Command to get all connections for a project
///
/// # Errors
/// Returns a string error if there was a problem accessing the database
#[command]
pub async fn get_project_connections(
    project_id: i64,
    state: State<'_, AppState>,
) -> Result<Vec<Connection>, String> {
    info!("Fetching connections for project: {}", project_id);

    let connection_repo = ConnectionRepository::new(state.db.clone());

    connection_repo.get_by_project(project_id).await.map_err(|e| {
        error!("Failed to fetch project connections: {}", e);
        e.to_string()
    })
}
