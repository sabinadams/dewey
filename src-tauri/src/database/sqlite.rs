use crate::error::AppResult;
use super::{DatabaseConnection, QueryExecutor, SchemaIntrospection, ColumnInfo, Relationship};
use async_trait::async_trait;
use rusqlite::{Connection, params};
use std::path::Path;
use std::sync::Mutex;

pub struct SqliteDatabase {
    connection: Mutex<Option<Connection>>,
    path: String,
}

impl SqliteDatabase {
    pub fn new<P: AsRef<Path>>(path: P) -> AppResult<Self> {
        Ok(Self {
            connection: Mutex::new(None),
            path: path.as_ref().to_string_lossy().to_string(),
        })
    }
}

#[async_trait]
impl DatabaseConnection for SqliteDatabase {
    async fn connect(&self) -> AppResult<()> {
        let conn = Connection::open(&self.path)?;
        *self.connection.lock().unwrap() = Some(conn);
        Ok(())
    }

    async fn disconnect(&self) -> AppResult<()> {
        *self.connection.lock().unwrap() = None;
        Ok(())
    }

    async fn test_connection(&self) -> AppResult<bool> {
        if let Some(conn) = &*self.connection.lock().unwrap() {
            conn.execute("SELECT 1", [])?;
            Ok(true)
        } else {
            Ok(false)
        }
    }
}

#[async_trait]
impl QueryExecutor for SqliteDatabase {
    async fn execute_query(&self, query: &str) -> AppResult<Vec<serde_json::Value>> {
        let conn = self.connection.lock().unwrap();
        let conn = conn.as_ref().unwrap();
        
        let mut stmt = conn.prepare(query)?;
        let column_names: Vec<String> = stmt.column_names().into_iter().map(String::from).collect();
        
        let rows = stmt.query_map([], |row| {
            let mut map = serde_json::Map::new();
            for (i, column_name) in column_names.iter().enumerate() {
                let value: rusqlite::types::Value = row.get(i)?;
                map.insert(column_name.clone(), convert_sqlite_value_to_json(value));
            }
            Ok(serde_json::Value::Object(map))
        })?;

        let mut results = Vec::new();
        for row in rows {
            results.push(row?);
        }
        
        Ok(results)
    }

    async fn explain_query(&self, query: &str) -> AppResult<String> {
        let conn = self.connection.lock().unwrap();
        let conn = conn.as_ref().unwrap();
        
        let mut stmt = conn.prepare(&format!("EXPLAIN QUERY PLAN {}", query))?;
        let mut explanation = String::new();
        
        let rows = stmt.query_map([], |row| {
            let detail: String = row.get(3)?;
            Ok(detail)
        })?;

        for row in rows {
            explanation.push_str(&row?);
            explanation.push('\n');
        }
        
        Ok(explanation)
    }
}

#[async_trait]
impl SchemaIntrospection for SqliteDatabase {
    async fn get_tables(&self) -> AppResult<Vec<String>> {
        let conn = self.connection.lock().unwrap();
        let conn = conn.as_ref().unwrap();
        
        let mut stmt = conn.prepare(
            "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
        )?;
        
        let tables = stmt.query_map([], |row| row.get(0))?;
        let mut table_names = Vec::new();
        
        for table in tables {
            table_names.push(table?);
        }
        
        Ok(table_names)
    }

    async fn get_columns(&self, table: &str) -> AppResult<Vec<ColumnInfo>> {
        let conn = self.connection.lock().unwrap();
        let conn = conn.as_ref().unwrap();
        
        let mut stmt = conn.prepare(&format!("PRAGMA table_info({})", table))?;
        let columns = stmt.query_map([], |row| {
            Ok(ColumnInfo {
                name: row.get(1)?,
                data_type: row.get(2)?,
                is_nullable: row.get(3)? == 0,
                is_primary: row.get(5)? == 1,
            })
        })?;
        
        let mut column_info = Vec::new();
        for column in columns {
            column_info.push(column?);
        }
        
        Ok(column_info)
    }

    async fn get_relationships(&self) -> AppResult<Vec<Relationship>> {
        // For SQLite, we'll need to parse the foreign key constraints
        // This is a simplified implementation
        let conn = self.connection.lock().unwrap();
        let conn = conn.as_ref().unwrap();
        
        let mut relationships = Vec::new();
        let tables = self.get_tables().await?;
        
        for table in tables {
            let mut stmt = conn.prepare(&format!("PRAGMA foreign_key_list({})", table))?;
            let foreign_keys = stmt.query_map([], |row| {
                Ok(Relationship {
                    table_from: table.clone(),
                    column_from: row.get(3)?,
                    table_to: row.get(2)?,
                    column_to: row.get(4)?,
                    relationship_type: super::RelationType::ManyToOne, // Simplified
                })
            })?;
            
            for fk in foreign_keys {
                relationships.push(fk?);
            }
        }
        
        Ok(relationships)
    }
}

fn convert_sqlite_value_to_json(value: rusqlite::types::Value) -> serde_json::Value {
    match value {
        rusqlite::types::Value::Null => serde_json::Value::Null,
        rusqlite::types::Value::Integer(i) => serde_json::Value::Number(i.into()),
        rusqlite::types::Value::Real(f) => {
            if let Some(n) = serde_json::Number::from_f64(f) {
                serde_json::Value::Number(n)
            } else {
                serde_json::Value::Null
            }
        },
        rusqlite::types::Value::Text(s) => serde_json::Value::String(s),
        rusqlite::types::Value::Blob(b) => {
            serde_json::Value::String(base64::encode(&b))
        },
    }
} 