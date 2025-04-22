use crate::types::AppResult;
use sqlx::{postgres, mysql, sqlite};
use mongodb::{Client as MongoClient, options::ClientOptions};
use std::path::Path;
use std::fs;
use tracing::debug;

/// Tests a database connection based on the connection parameters
/// 
/// # Arguments
/// * `db_type` - The type of database ("postgres", "mysql", "mongodb", "sqlite")
/// * `host` - The host address
/// * `port` - The port number
/// * `username` - The username for authentication
/// * `password` - The password for authentication
/// * `database` - The database name or file path for SQLite
/// 
/// # Returns
/// * `Ok(())` if the connection test was successful
/// * `Err(_)` if the connection test failed
pub async fn test_connection(
    db_type: &str,
    host: &str,
    port: &str,
    username: &str,
    password: &str,
    database: &str,
) -> AppResult<()> {
    debug!("Testing {} connection to {}:{}", db_type, host, port);

    match db_type.to_lowercase().as_str() {
        "postgres" => {
            let connection_string = format!(
                "postgres://{}:{}@{}:{}/{}",
                username, password, host, port, database
            );
            let _pool = postgres::PgPool::connect(&connection_string).await?;
            debug!("PostgreSQL connection test successful");
        }
        "mysql" => {
            let connection_string = format!(
                "mysql://{}:{}@{}:{}/{}",
                username, password, host, port, database
            );
            let _pool = mysql::MySqlPool::connect(&connection_string).await?;
            debug!("MySQL connection test successful");
        }
        "mongodb" => {
            let connection_string = if username.is_empty() && password.is_empty() {
                format!("mongodb://{}:{}", host, port)
            } else {
                format!("mongodb://{}:{}@{}:{}", username, password, host, port)
            };
            
            let mut client_options = ClientOptions::parse(&connection_string).await?;
            client_options.app_name = Some("Dewey".to_string());
            
            let client = MongoClient::with_options(client_options)?;
            // Test connection by listing databases
            client.list_database_names(None, None).await?;
            debug!("MongoDB connection test successful");
        }
        "sqlite" => {
            // For SQLite, we need to handle both file-based and hosted connections
            if host == "localhost" && port == "0" {
                // File-based SQLite
                if database.is_empty() {
                    return Err("SQLite database path cannot be empty".into());
                }

                let path = Path::new(database);
                
                // If the file exists, verify it's a valid SQLite database
                if path.exists() {
                    // Try to read the first few bytes to verify it's a SQLite database
                    let mut file = fs::File::open(path)?;
                    let mut header = [0u8; 16];
                    use std::io::Read;
                    if file.read_exact(&mut header).is_ok() {
                        // SQLite files start with "SQLite format 3\0"
                        if &header[0..15] != b"SQLite format 3" {
                            return Err("File exists but is not a valid SQLite database".into());
                        }
                    } else {
                        return Err("Failed to read database file header".into());
                    }
                } else {
                    // If file doesn't exist, ensure we can create it
                    if let Some(parent) = path.parent() {
                        std::fs::create_dir_all(parent)?;
                        // Try to create an empty file to verify permissions
                        fs::File::create(path)?.sync_all()?;
                        // Remove the empty file since SQLx will create it
                        fs::remove_file(path)?;
                    }
                }
                
                // Use sqlite:// prefix for file-based connections
                let connection_string = format!("sqlite://{}", database);
                let _pool = sqlite::SqlitePool::connect(&connection_string).await?;
                debug!("SQLite file connection test successful");
            } else {
                // Hosted SQLite
                let connection_string = format!(
                    "sqlite://{}:{}@{}:{}/{}",
                    username, password, host, port, database
                );
                let _pool = sqlite::SqlitePool::connect(&connection_string).await?;
                debug!("SQLite hosted connection test successful");
            }
        }
        _ => {
            return Err(format!("Unsupported database type: {}", db_type).into());
        }
    }

    Ok(())
} 