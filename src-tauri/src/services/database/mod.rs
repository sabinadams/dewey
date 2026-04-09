use mongodb::{Client as MongoClient, options::ClientOptions};
use sqlx::mysql::{MySqlConnectOptions, MySqlPool, MySqlSslMode};
use sqlx::postgres::{PgConnectOptions, PgPool, PgSslMode};
use sqlx::sqlite;
use std::fs;
use std::io::Read;
use std::path::Path;
use tracing::debug;

/// `localhost` / `::1` often resolve to IPv6 first on macOS; Docker Desktop Postgres typically
/// listens on IPv4 only. Force IPv4 loopback so behavior matches many GUI clients.
fn tcp_host_for_local_connect(host: &str) -> &str {
    let h = host.trim();
    if h.eq_ignore_ascii_case("localhost") || h == "::1" {
        "127.0.0.1"
    } else {
        h
    }
}

fn disable_tls_for_loopback(original_host: &str, resolved_host: &str) -> bool {
    let o = original_host.trim();
    o.eq_ignore_ascii_case("localhost")
        || o == "127.0.0.1"
        || o == "::1"
        || resolved_host == "127.0.0.1"
}

/// Tests a database connection based on the connection parameters
pub async fn test_connection(
    db_type: &str,
    host: &str,
    port: &str,
    username: &str,
    password: &str,
    database: &str,
) -> Result<(), String> {
    let db_type = db_type.trim();
    let host = host.trim();
    let port = port.trim();
    let username = username.trim();
    let database = database.trim();

    debug!("Testing {} connection to {}:{}", db_type, host, port);

    match db_type.to_lowercase().as_str() {
        "postgres" => {
            let port_num: u16 = port
                .parse()
                .map_err(|_| "Invalid port number".to_string())?;
            let connect_host = tcp_host_for_local_connect(host);
            let mut opts = PgConnectOptions::new_without_pgpass()
                .host(connect_host)
                .port(port_num)
                .username(username)
                .password(password)
                .database(database);
            if disable_tls_for_loopback(host, connect_host) {
                opts = opts.ssl_mode(PgSslMode::Disable);
            }
            PgPool::connect_with(opts)
                .await
                .map_err(|e| e.to_string())?;
            debug!("PostgreSQL connection test successful");
        }
        "mysql" => {
            let port_num: u16 = port
                .parse()
                .map_err(|_| "Invalid port number".to_string())?;
            let connect_host = tcp_host_for_local_connect(host);
            let mut opts = MySqlConnectOptions::new()
                .host(connect_host)
                .port(port_num)
                .username(username)
                .password(password)
                .database(database);
            if disable_tls_for_loopback(host, connect_host) {
                // `Preferred` can still fail against servers with no TLS on some native-tls builds.
                opts = opts.ssl_mode(MySqlSslMode::Disabled);
            }
            MySqlPool::connect_with(opts)
                .await
                .map_err(|e| e.to_string())?;
            debug!("MySQL connection test successful");
        }
        "mongodb" => {
            let connection_string = if username.is_empty() && password.is_empty() {
                format!(
                    "mongodb://{}:{}",
                    tcp_host_for_local_connect(host),
                    port
                )
            } else {
                format!(
                    "mongodb://{}:{}@{}:{}",
                    username,
                    password,
                    tcp_host_for_local_connect(host),
                    port
                )
            };

            let mut client_options = ClientOptions::parse(&connection_string)
                .await
                .map_err(|e| e.to_string())?;
            client_options.app_name = Some("Dewey".to_string());

            let client = MongoClient::with_options(client_options).map_err(|e| e.to_string())?;
            client
                .list_database_names(None, None)
                .await
                .map_err(|e| e.to_string())?;
            debug!("MongoDB connection test successful");
        }
        "sqlite" => {
            if host == "localhost" && port == "0" {
                if database.is_empty() {
                    return Err("SQLite database path cannot be empty".to_string());
                }

                let path = Path::new(database);

                if path.exists() {
                    let mut file =
                        fs::File::open(path).map_err(|e| e.to_string())?;
                    let mut header = [0u8; 16];
                    if file.read_exact(&mut header).is_ok() {
                        if &header[0..15] != b"SQLite format 3" {
                            return Err("File exists but is not a valid SQLite database".to_string());
                        }
                    } else {
                        return Err("Failed to read database file header".to_string());
                    }
                } else if let Some(parent) = path.parent() {
                    std::fs::create_dir_all(parent).map_err(|e| e.to_string())?;
                    fs::File::create(path)
                        .and_then(|f| f.sync_all())
                        .map_err(|e| e.to_string())?;
                    fs::remove_file(path).map_err(|e| e.to_string())?;
                }

                let connection_string = format!("sqlite://{}", database);
                sqlite::SqlitePool::connect(&connection_string)
                    .await
                    .map_err(|e| e.to_string())?;
                debug!("SQLite file connection test successful");
            } else {
                let connection_string = format!(
                    "sqlite://{}:{}@{}:{}/{}",
                    username, password, host, port, database
                );
                sqlite::SqlitePool::connect(&connection_string)
                    .await
                    .map_err(|e| e.to_string())?;
                debug!("SQLite hosted connection test successful");
            }
        }
        _ => {
            return Err(format!("Unsupported database type: {}", db_type));
        }
    }

    Ok(())
}
