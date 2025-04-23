use crate::types::AppResult;
use crate::constants::ONBOARDING_VERSION;
use serde::{Deserialize, Serialize};
use sqlx::{FromRow, SqlitePool};
use std::sync::Arc;

/// Represents the onboarding process in the application
#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Onboarding {
    pub id: i64,
    pub has_completed: bool,
    pub version: i32,
    pub created_at: i64,
    pub updated_at: i64,
}

/// Repository for handling onboarding operations in the database
pub struct OnboardingRepository {
    pool: Arc<SqlitePool>
}

impl OnboardingRepository {
    pub fn new(pool: Arc<SqlitePool>) -> Self {
        Self { pool }
    }

    /// Store the onboarding process in the database
    /// 
    /// # Errors
    /// Returns a string error if there was a problem accessing the database or the onboarding could not be stored
    pub async fn store(&self, has_completed: bool) -> AppResult<Onboarding> {
        let result =
            sqlx::query_as::<_, Onboarding>("INSERT INTO onboarding (has_completed, version) VALUES (?, ?) RETURNING *")
                .bind(has_completed)
                .bind(ONBOARDING_VERSION)
                .fetch_one(&*self.pool)
                .await?;

        Ok(result)
    }

    /// Check if the onboarding process should run. It should run if the user has no complete records yet or if the last version is different from the current version
    /// 
    /// # Errors
    /// Returns a string error if there was a problem accessing the database or the onboarding could not be retrieved
    pub async fn should_run(&self) -> AppResult<bool> {
        let has_completed = sqlx::query_scalar::<_, bool>(
            "SELECT EXISTS(SELECT 1 FROM onboarding WHERE has_completed = 1 AND version = ?)"
        )
        .bind(ONBOARDING_VERSION)
        .fetch_one(&*self.pool)
        .await?;

        Ok(!has_completed)
    }
}
