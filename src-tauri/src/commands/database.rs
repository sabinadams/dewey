use crate::error::categories::{DatabaseSubcategory, ConnectionSubcategory, ErrorCategory};
use crate::services::database;

#[tauri::command]
pub async fn test_connection(
    db_type: String,
    host: String,
    port: String,
    username: String,
    password: String,
    database: String,
) -> Result<(), ErrorCategory> {
    database::test_connection(
        &db_type,
        &host,
        &port,
        &username,
        &password,
        &database,
    ).await.map_err(|e| match e {
        ErrorCategory::Database(_) => ErrorCategory::Database(DatabaseSubcategory::ConnectionFailed),
        ErrorCategory::Connection(_) => ErrorCategory::Connection(ConnectionSubcategory::ConnectionFailed),
        _ => ErrorCategory::Connection(ConnectionSubcategory::ConnectionFailed),
    })
} 