use crate::types::AppResult;
use serde::{Deserialize, Serialize};
use sqlx::{FromRow, SqlitePool};
use std::sync::Arc;

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
}

impl OnboardingRepository {
    pub fn new(pool: Arc<SqlitePool>) -> Self {
        Self { pool }
    }

    pub async fn store(&self, has_completed: bool, last_version: String) -> AppResult<Onboarding> {
        let result =
            sqlx::query_as::<_, Onboarding>("INSERT INTO onboarding (has_completed, last_version) VALUES (?, ?) RETURNING *")
                .bind(has_completed)
                .bind(last_version)
                .fetch_one(&*self.pool)
                .await?;

        Ok(result)
    }
}
