use crate::error::AppResult;
use serde::{Deserialize, Serialize};
use sqlx::{FromRow, Row, SqlitePool};
use std::sync::Arc;
use tracing::{debug, instrument};

/// Represents a user project in the application
#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Project {
    pub id: i64,
    pub name: String,
    pub user_id: String,
    pub created_at: i64,
    pub updated_at: i64,
    pub icon_path: Option<String>,
}

/// Repository for handling project operations in the database
pub struct ProjectRepository {
    pool: Arc<SqlitePool>,
}

impl ProjectRepository {
    /// Create a new ProjectRepository instance
    pub fn new(pool: Arc<SqlitePool>) -> Self {
        Self { pool }
    }

    /// Create a new project for a user
    #[instrument(skip(self), fields(project_name = %name, user_id = %user_id))]
    pub async fn create(&self, name: &str, user_id: &str, icon_path: Option<&str>) -> AppResult<i64> {
        debug!("Creating new project");
        let result = sqlx::query(
            r#"
            INSERT INTO projects (name, user_id, icon_path, created_at, updated_at)
            VALUES (?, ?, ?, unixepoch(), unixepoch())
            RETURNING id
            "#
        )
        .bind(name)
        .bind(user_id)
        .bind(icon_path)
        .fetch_one(&*self.pool)
        .await?;

        let id = result.get(0);
        debug!("Created project with ID: {}", id);
        Ok(id)
    }

    /// Get all projects for a user
    #[instrument(skip(self), fields(user_id = %user_id))]
    pub async fn get_by_user(&self, user_id: &str) -> AppResult<Vec<Project>> {
        debug!("Fetching projects for user");
        let projects = sqlx::query_as::<_, Project>(
            r#"
            SELECT id, name, user_id, created_at, updated_at, icon_path
            FROM projects
            WHERE user_id = ?
            ORDER BY created_at DESC
            "#
        )
        .bind(user_id)
        .fetch_all(&*self.pool)
        .await?;

        debug!("Found {} projects", projects.len());
        Ok(projects)
    }

    /// Update a project's name
    #[instrument(skip(self), fields(project_id = %id))]
    pub async fn update(&self, id: i64, name: &str) -> AppResult<()> {
        debug!("Updating project name");
        sqlx::query(
            r#"
            UPDATE projects
            SET name = ?, updated_at = unixepoch()
            WHERE id = ?
            "#
        )
        .bind(name)
        .bind(id)
        .execute(&*self.pool)
        .await?;

        debug!("Project updated successfully");
        Ok(())
    }

    /// Delete a project
    #[instrument(skip(self), fields(project_id = %id))]
    pub async fn delete(&self, id: i64) -> AppResult<()> {
        debug!("Deleting project");
        sqlx::query(
            r#"
            DELETE FROM projects
            WHERE id = ?
            "#
        )
        .bind(id)
        .execute(&*self.pool)
        .await?;

        debug!("Project deleted successfully");
        Ok(())
    }

    /// Get a specific project by ID and verify it belongs to the user
    #[instrument(skip(self), fields(project_id = %id, user_id = %user_id))]
    pub async fn get_by_id(&self, id: i64, user_id: &str) -> AppResult<Option<Project>> {
        debug!("Fetching project by ID");
        let project = sqlx::query_as::<_, Project>(
            r#"
            SELECT id, name, user_id, created_at, updated_at, icon_path
            FROM projects 
            WHERE id = ? AND user_id = ?
            "#
        )
        .bind(id)
        .bind(user_id)
        .fetch_optional(&*self.pool)
        .await?;

        debug!("Project lookup complete");
        Ok(project)
    }

    /// Check if a project exists and belongs to the user
    #[instrument(skip(self), fields(project_id = %project_id, user_id = %user_id))]
    pub async fn exists(&self, project_id: i64, user_id: &str) -> AppResult<bool> {
        debug!("Checking if project exists");
        let exists = sqlx::query_scalar(
            r#"
            SELECT EXISTS(SELECT 1 FROM projects WHERE id = ? AND user_id = ?)
            "#
        )
        .bind(project_id)
        .bind(user_id)
        .fetch_one(&*self.pool)
        .await?;

        debug!("Project existence check: {}", exists);
        Ok(exists)
    }
}

// Legacy functions for backward compatibility
// These will use the new repository implementation internally

/// Create a new project
pub async fn create(pool: &SqlitePool, name: &str, user_id: &str, icon_path: Option<&str>) -> AppResult<i64> {
    let repo = ProjectRepository::new(Arc::new(pool.clone()));
    repo.create(name, user_id, icon_path).await
}

/// Get all projects for a user
pub async fn get_by_user(pool: &SqlitePool, user_id: &str) -> AppResult<Vec<Project>> {
    let repo = ProjectRepository::new(Arc::new(pool.clone()));
    repo.get_by_user(user_id).await
}

/// Update a project's name
pub async fn update(pool: &SqlitePool, id: i64, name: &str) -> AppResult<()> {
    let repo = ProjectRepository::new(Arc::new(pool.clone()));
    repo.update(id, name).await
}

/// Delete a project
pub async fn delete(pool: &SqlitePool, id: i64) -> AppResult<()> {
    let repo = ProjectRepository::new(Arc::new(pool.clone()));
    repo.delete(id).await
}

/// Get a specific project by ID
pub async fn get_by_id(pool: &SqlitePool, id: i64, user_id: &str) -> AppResult<Option<Project>> {
    let repo = ProjectRepository::new(Arc::new(pool.clone()));
    repo.get_by_id(id, user_id).await
}

/// Check if a project exists
pub async fn exists(pool: &SqlitePool, project_id: i64, user_id: &str) -> AppResult<bool> {
    let repo = ProjectRepository::new(Arc::new(pool.clone()));
    repo.exists(project_id, user_id).await
} 