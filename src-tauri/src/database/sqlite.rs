use crate::error::AppResult;
use super::{DatabaseConnection, QueryExecutor, SchemaIntrospection, ColumnInfo, Relationship, Project};
use async_trait::async_trait;
use sqlx::{SqlitePool, Pool, Sqlite, Row};
use std::path::Path;

#[derive(Debug)]
pub struct SqliteDatabase {
    pool: Option<Pool<Sqlite>>,
    path: String,
}

impl SqliteDatabase {
    pub fn new<P: AsRef<Path>>(path: P) -> AppResult<Self> {
        Ok(Self {
            pool: None,
            path: format!("sqlite:{}", path.as_ref().to_string_lossy()),
        })
    }

    pub async fn create_project(&self, name: &str, user_id: &str) -> AppResult<i64> {
        let pool = self.pool.as_ref().unwrap();
        let result = sqlx::query!(
            r#"
            INSERT INTO projects (name, user_id)
            VALUES (?, ?)
            "#,
            name,
            user_id
        )
        .execute(pool)
        .await?;

        Ok(result.last_insert_rowid())
    }

    pub async fn get_user_projects(&self, user_id: &str) -> AppResult<Vec<Project>> {
        let pool = self.pool.as_ref().unwrap();
        let projects = sqlx::query_as!(
            Project,
            r#"
            SELECT id, name, user_id, created_at, updated_at
            FROM projects
            WHERE user_id = ?
            ORDER BY created_at DESC
            "#,
            user_id
        )
        .fetch_all(pool)
        .await?;

        Ok(projects)
    }
}

#[async_trait]
impl DatabaseConnection for SqliteDatabase {
    async fn connect(&self) -> AppResult<()> {
        let pool = SqlitePool::connect(&self.path).await?;
        self.pool = Some(pool);
        Ok(())
    }

    async fn disconnect(&self) -> AppResult<()> {
        if let Some(pool) = &self.pool {
            pool.close().await;
        }
        Ok(())
    }

    async fn test_connection(&self) -> AppResult<bool> {
        if let Some(pool) = &self.pool {
            sqlx::query("SELECT 1").execute(pool).await?;
            Ok(true)
        } else {
            Ok(false)
        }
    }
}

#[async_trait]
impl QueryExecutor for SqliteDatabase {
    async fn execute_query(&self, query: &str) -> AppResult<Vec<serde_json::Value>> {
        let pool = self.pool.as_ref().unwrap();
        let rows = sqlx::query(query)
            .fetch_all(pool)
            .await?;
        
        let mut results = Vec::new();
        for row in rows {
            let mut map = serde_json::Map::new();
            for (i, column) in row.columns().iter().enumerate() {
                let value: Option<String> = row.try_get(i)?;
                map.insert(
                    column.name().to_string(),
                    value.map_or(serde_json::Value::Null, |v| serde_json::Value::String(v)),
                );
            }
            results.push(serde_json::Value::Object(map));
        }
        
        Ok(results)
    }

    async fn explain_query(&self, query: &str) -> AppResult<String> {
        let pool = self.pool.as_ref().unwrap();
        let rows = sqlx::query(&format!("EXPLAIN QUERY PLAN {}", query))
            .fetch_all(pool)
            .await?;
        
        let mut explanation = String::new();
        for row in rows {
            let detail: String = row.try_get(3)?;
            explanation.push_str(&detail);
            explanation.push('\n');
        }
        
        Ok(explanation)
    }
}

#[async_trait]
impl SchemaIntrospection for SqliteDatabase {
    async fn get_tables(&self) -> AppResult<Vec<String>> {
        let pool = self.pool.as_ref().unwrap();
        let rows = sqlx::query(
            "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
        )
        .fetch_all(pool)
        .await?;
        
        let mut table_names = Vec::new();
        for row in rows {
            table_names.push(row.try_get(0)?);
        }
        
        Ok(table_names)
    }

    async fn get_columns(&self, table: &str) -> AppResult<Vec<ColumnInfo>> {
        let pool = self.pool.as_ref().unwrap();
        let rows = sqlx::query(&format!("PRAGMA table_info({})", table))
            .fetch_all(pool)
            .await?;
        
        let mut column_info = Vec::new();
        for row in rows {
            column_info.push(ColumnInfo {
                name: row.try_get(1)?,
                data_type: row.try_get(2)?,
                is_nullable: row.try_get::<i32, _>(3)? == 0,
                is_primary: row.try_get::<i32, _>(5)? == 1,
            });
        }
        
        Ok(column_info)
    }

    async fn get_relationships(&self) -> AppResult<Vec<Relationship>> {
        let pool = self.pool.as_ref().unwrap();
        let tables = self.get_tables().await?;
        let mut relationships = Vec::new();
        
        for table in tables {
            let rows = sqlx::query(&format!("PRAGMA foreign_key_list({})", table))
                .fetch_all(pool)
                .await?;
            
            for row in rows {
                relationships.push(Relationship {
                    table_from: table.clone(),
                    column_from: row.try_get(3)?,
                    table_to: row.try_get(2)?,
                    column_to: row.try_get(4)?,
                    relationship_type: super::RelationType::ManyToOne, // Simplified
                });
            }
        }
        
        Ok(relationships)
    }
} 