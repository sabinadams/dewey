pub mod commands;
pub mod error;
pub mod storage;

pub use error::{AppError, AppResult};
pub use storage::LocalStorage;

use sqlx::SqlitePool;
use std::sync::Arc;

#[derive(Debug)]
pub struct AppState {
    pub db: Arc<SqlitePool>,
} 