-- Add migration script here
CREATE TABLE IF NOT EXISTS connections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    connection_name TEXT NOT NULL,
    project_id INTEGER NOT NULL,
    db_type TEXT NOT NULL,
    encrypted_host BLOB NOT NULL,
    encrypted_port BLOB NOT NULL,
    encrypted_username BLOB NOT NULL,
    encrypted_password BLOB NOT NULL,
    encrypted_database BLOB,  -- Can be NULL if not applicable
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
