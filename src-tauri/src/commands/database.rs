use crate::services::database;
use dewey_macros::command;

#[command]
pub async fn test_connection(
    db_type: String,
    host: String,
    port: String,
    username: String,
    password: String,
    database: String,
) -> Result<(), String> {
    database::test_connection(
        &db_type,
        &host,
        &port,
        &username,
        &password,
        &database,
    ).await.map_err(|e| e.to_string())
} 