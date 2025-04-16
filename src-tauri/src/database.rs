use rusqlite::{Connection, Result as SqliteResult};
use serde::{Deserialize, Serialize};
use std::path::PathBuf;
use std::sync::Mutex;
use std::{fs, path::Path};
use thiserror::Error;

#[derive(Error, Debug)]
pub enum DatabaseError {
    #[error("SQLite error: {0}")]
    Sqlite(#[from] rusqlite::Error),
    #[error("IO error: {0}")]
    Io(#[from] std::io::Error),
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Project {
    pub id: i64,
    pub name: String,
    pub description: Option<String>,
    pub created_at: String,
    pub user_id: String,
}

pub struct Database {
    conn: Mutex<Connection>,
}

impl Database {
    pub fn new(app_dir: &Path) -> Result<Self, DatabaseError> {
        // Ensure the directory exists
        fs::create_dir_all(app_dir)?;
        let db_path = app_dir.join("dewey.db");
        let conn = Connection::open(db_path)?;
        
        // Initialize the database with our schema
        conn.execute(
            "CREATE TABLE IF NOT EXISTS projects (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                user_id TEXT NOT NULL
            )",
            [],
        )?;

        Ok(Database {
            conn: Mutex::new(conn),
        })
    }

    pub fn create_project(&self, name: &str, description: Option<&str>, user_id: &str) -> Result<i64, DatabaseError> {
        let conn = self.conn.lock().unwrap();
        conn.execute(
            "INSERT INTO projects (name, description, user_id) VALUES (?1, ?2, ?3)",
            (name, description, user_id),
        )?;
        Ok(conn.last_insert_rowid())
    }

    pub fn get_user_projects(&self, user_id: &str) -> Result<Vec<Project>, DatabaseError> {
        let conn = self.conn.lock().unwrap();
        let mut stmt = conn.prepare(
            "SELECT id, name, description, created_at, user_id FROM projects WHERE user_id = ? ORDER BY created_at DESC"
        )?;
        
        let projects = stmt.query_map([user_id], |row| {
            Ok(Project {
                id: row.get(0)?,
                name: row.get(1)?,
                description: row.get(2)?,
                created_at: row.get(3)?,
                user_id: row.get(4)?,
            })
        })?;

        projects.collect::<SqliteResult<Vec<Project>>>().map_err(DatabaseError::from)
    }
} 