use crate::types::AppResult;
use serde::{Deserialize, Serialize};
use sqlx::{FromRow, SqlitePool};
use std::sync::Arc;
use tauri::AppHandle;

/// Represents the onboarding process in the application
#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Onboarding {
    pub id: i64,
    pub has_completed: bool,
    pub last_version: String,
    pub created_at: i64,
    pub updated_at: i64,
}

/// Repository for handling onboarding operations in the database
pub struct OnboardingRepository {
    pool: Arc<SqlitePool>,
    app: AppHandle,
}

impl OnboardingRepository {
    pub fn new(pool: Arc<SqlitePool>, app: AppHandle) -> Self {
        Self { pool, app }
    }

    /// Store the onboarding process in the database
    /// 
    /// # Errors
    /// Returns a string error if there was a problem accessing the database or the onboarding could not be stored
    pub async fn store(&self, has_completed: bool, last_version: String) -> AppResult<Onboarding> {
        let result =
            sqlx::query_as::<_, Onboarding>("INSERT INTO onboarding (has_completed, last_version) VALUES (?, ?) RETURNING *")
                .bind(has_completed)
                .bind(last_version)
                .fetch_one(&*self.pool)
                .await?;

        Ok(result)
    }

    /// Check if the onboarding process should run. It should run if the user has no complete records yet or if the last version is different from the current version
    /// 
    /// # Errors
    /// Returns a string error if there was a problem accessing the database or the onboarding could not be retrieved
    pub async fn should_run(&self) -> AppResult<bool> {
        let current_version = self.app.package_info().version.to_string();
        
        let should_run = sqlx::query_scalar::<_, bool>(
            "SELECT NOT EXISTS(SELECT 1 FROM onboarding WHERE has_completed = 1 AND last_version = ?)"
        )
        .bind(current_version)
        .fetch_one(&*self.pool)
        .await?;

        Ok(should_run)
    }
}
