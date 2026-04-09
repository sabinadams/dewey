use crate::error::categories::{DatabaseSubcategory, ErrorCategory};
use crate::error::{AppError, ErrorSeverity};
use crate::services::database;

#[tauri::command]
pub async fn test_connection(
    db_type: String,
    host: String,
    port: String,
    username: String,
    password: String,
    database: String,
) -> Result<(), AppError> {
    database::test_connection(
        &db_type,
        &host,
        &port,
        &username,
        &password,
        &database,
    )
    .await
    .map_err(|msg| {
        AppError::new(
            msg,
            ErrorCategory::Database(DatabaseSubcategory::ConnectionFailed),
            ErrorSeverity::Error,
        )
    })
}
