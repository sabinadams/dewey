use crate::error::{ErrorCategory, DatabaseSnafu};
use serde::{Deserialize, Serialize};
use sqlx::{FromRow, Row, SqlitePool};
use std::sync::Arc;
use tracing::debug;
use snafu::ResultExt;

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
    /// Create a new `ProjectRepository` instance
    #[must_use]
    pub fn new(pool: Arc<SqlitePool>) -> Self {
        Self { pool }
    }

    /// Create a new project
    ///
    /// # Errors
    /// Returns an error if there was a problem executing the query
    pub async fn create(&self, name: &str, user_id: &str, icon_path: Option<&str>) -> Result<i64, ErrorCategory> {
        debug!("Creating new project '{}' for user: {}", name, user_id);
        
        let result = sqlx::query(
            r"
            INSERT INTO projects (name, user_id, icon_path, created_at, updated_at)
            VALUES (?, ?, ?, unixepoch(), unixepoch())
            RETURNING id
            "
        )
        .bind(name)
        .bind(user_id)
        .bind(icon_path)
        .fetch_one(&*self.pool)
        .await
        .context(DatabaseSnafu { subcategory: None })?;

        let id = result.get(0);
        debug!("Project created successfully");
        Ok(id)
    }

    /// Get all projects for a user
    ///
    /// # Errors
    /// Returns an error if there was a problem executing the query
    pub async fn get_by_user(&self, user_id: &str) -> Result<Vec<Project>, ErrorCategory> {
        debug!("Fetching projects for user: {}", user_id);
        
        let projects = sqlx::query_as::<_, Project>(
            r"
            SELECT id, name, user_id, created_at, updated_at, icon_path
            FROM projects
            WHERE user_id = ?
            ORDER BY created_at ASC
            "
        )
        .bind(user_id)
        .fetch_all(&*self.pool)
        .await
        .context(DatabaseSnafu { subcategory: None })?;

        debug!("Found {} projects", projects.len());
        Ok(projects)
    }

    /// Update a project's name
    ///
    /// # Errors
    /// Returns an error if there was a problem executing the query
    pub async fn update(&self, id: i64, name: &str) -> Result<(), ErrorCategory> {
        debug!("Updating project {} with name: {}", id, name);
        
        sqlx::query(
            r"
            UPDATE projects
            SET name = ?, updated_at = unixepoch()
            WHERE id = ?
            "
        )
        .bind(name)
        .bind(id)
        .execute(&*self.pool)
        .await
        .context(DatabaseSnafu { subcategory: None })?;

        debug!("Project updated successfully");
        Ok(())
    }

    /// Delete a project
    ///
    /// # Errors
    /// Returns an error if there was a problem executing the query
    pub async fn delete(&self, id: i64) -> Result<(), ErrorCategory> {
        debug!("Deleting project: {}", id);
        
        sqlx::query(
            r"
            DELETE FROM projects
            WHERE id = ?
            "
        )
        .bind(id)
        .execute(&*self.pool)
        .await
        .context(DatabaseSnafu { subcategory: None })?;

        debug!("Project deleted successfully");
        Ok(())
    }

    /// Get a project by ID and user ID
    ///
    /// # Errors
    /// Returns an error if there was a problem executing the query
    pub async fn get_by_id(&self, id: i64, user_id: &str) -> Result<Option<Project>, ErrorCategory> {
        debug!("Fetching project {} for user: {}", id, user_id);
        
        let project = sqlx::query_as::<_, Project>(
            r"
            SELECT id, name, user_id, created_at, updated_at, icon_path
            FROM projects 
            WHERE id = ? AND user_id = ?
            "
        )
        .bind(id)
        .bind(user_id)
        .fetch_optional(&*self.pool)
        .await
        .context(DatabaseSnafu { subcategory: None })?;

        debug!("Project lookup complete");
        Ok(project)
    }

    /// Check if a project exists and belongs to a user
    ///
    /// # Errors
    /// Returns an error if there was a problem executing the query
    pub async fn exists(&self, id: i64, user_id: &str) -> Result<bool, ErrorCategory> {
        debug!("Checking if project {} exists for user: {}", id, user_id);
        
        let exists: (bool,) = sqlx::query_as(
            r"
            SELECT EXISTS(SELECT 1 FROM projects WHERE id = ? AND user_id = ?)
            "
        )
        .bind(id)
        .bind(user_id)
        .fetch_one(&*self.pool)
        .await
        .context(DatabaseSnafu { subcategory: None })?;

        debug!("Project existence check: {}", exists.0);
        Ok(exists.0)
    }
} 