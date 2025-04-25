use crate::error::{AppError, ErrorSeverity};
use crate::error::categories::{DatabaseSubcategory, ErrorCategory};
use crate::types::AppResult;
use serde::{Deserialize, Serialize};
use sqlx::{FromRow, Row, SqlitePool, Transaction, Executor};
use std::sync::Arc;
use tracing::debug;

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
    /// # Arguments
    /// * `name` - The name of the project
    /// * `user_id` - The ID of the user creating the project
    /// * `icon_path` - Optional path to the project's icon
    /// * `tx` - Optional transaction to use for the operation
    ///
    /// # Errors
    /// Returns an error if there was a problem executing the query
    pub async fn create(
        &self,
        name: &str,
        user_id: &str,
        icon_path: Option<&str>,
        tx: Option<&mut Transaction<'_, sqlx::Sqlite>>,
    ) -> AppResult<i64> {
        debug!("Creating new project '{}' for user: {}", name, user_id);
        
        let query = sqlx::query(
            r"
            INSERT INTO projects (name, user_id, icon_path, created_at, updated_at)
            VALUES (?, ?, ?, unixepoch(), unixepoch())
            RETURNING id
            "
        )
        .bind(name)
        .bind(user_id)
        .bind(icon_path);

        let result = if let Some(tx) = tx {
            query.fetch_one(&mut **tx).await
        } else {
            query.fetch_one(&*self.pool).await
        }
        .map_err(|e| AppError::new(
            e.to_string(),
            ErrorCategory::Database(DatabaseSubcategory::QueryFailed),
            ErrorSeverity::Error,
        ))?;

        let id = result.get(0);
        debug!("Project created successfully");
        Ok(id)
    }

    /// Get all projects for a user
    ///
    /// # Errors
    /// Returns an error if there was a problem executing the query
    pub async fn get_by_user(&self, user_id: &str) -> AppResult<Vec<Project>> {
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
        .map_err(|e| AppError::new(
            e.to_string(),
            ErrorCategory::Database(DatabaseSubcategory::QueryFailed),
            ErrorSeverity::Error,
        ))?;

        debug!("Found {} projects", projects.len());
        Ok(projects)
    }

    /// Create a new project within a transaction
    ///
    /// # Errors
    /// Returns an error if there was a problem executing the query
    pub async fn create_with_transaction(
        &self,
        name: &str,
        user_id: &str,
        icon_path: Option<&str>,
        tx: &mut Transaction<'_, sqlx::Sqlite>,
    ) -> AppResult<i64> {
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
        .fetch_one(&mut **tx)
        .await
        .map_err(|e| AppError::new(
            e.to_string(),
            ErrorCategory::Database(DatabaseSubcategory::QueryFailed),
            ErrorSeverity::Error,
        ))?;

        let id = result.get(0);
        debug!("Project created successfully");
        Ok(id)
    }
} 