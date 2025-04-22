use crate::services::database;

#[tauri::command]
pub async fn test_connection(
    dbType: String,
    host: String,
    port: String,
    username: String,
    password: String,
    database: String,
) -> Result<(), String> {
    database::test_connection(
        &dbType,
        &host,
        &port,
        &username,
        &password,
        &database,
    ).await.map_err(|e| e.to_string())
} 