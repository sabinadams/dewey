use crate::error::AppResult;
use sqlx::{sqlite::SqlitePool, Pool, Sqlite};
use std::path::Path;

pub mod models;
pub mod repositories;

use repositories::ProjectRepository;

pub struct LocalStorage {
    pool: Pool<Sqlite>,
    pub projects: ProjectRepository<'static>,
}

impl LocalStorage {
    pub async fn new<P: AsRef<Path>>(path: P) -> AppResult<Self> {
        let database_url = format!("sqlite:{}", path.as_ref().to_string_lossy());
        let pool = SqlitePool::connect(&database_url).await?;
        
        // Run migrations
        sqlx::migrate!("./migrations").run(&pool).await?;

        // Convert pool to static reference for repositories
        let pool_ref = Box::leak(Box::new(pool));
        
        Ok(Self {
            pool: pool_ref.clone(),
            projects: ProjectRepository::new(pool_ref),
        })
    }
} 