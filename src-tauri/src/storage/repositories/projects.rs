use crate::error::AppResult;
use serde::{Deserialize, Serialize};
use sqlx::{FromRow, Row, SqlitePool};

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Project {
    pub id: i64,
    pub name: String,
    pub user_id: String,
    pub created_at: i64,
    pub updated_at: i64,
    pub icon_path: Option<String>,
}

pub async fn create(pool: &SqlitePool, name: &str, user_id: &str, icon_path: Option<&str>) -> AppResult<i64> {
    let result = sqlx::query(
        r#"
        INSERT INTO projects (name, user_id, icon_path, created_at, updated_at)
        VALUES (?, ?, ?, unixepoch(), unixepoch())
        RETURNING id
        "#
    )
    .bind(name)
    .bind(user_id)
    .bind(icon_path)
    .fetch_one(pool)
    .await?;

    Ok(result.get(0))
}

pub async fn get_by_user(pool: &SqlitePool, user_id: &str) -> AppResult<Vec<Project>> {
    let projects = sqlx::query_as::<_, Project>(
        r#"
        SELECT id, name, user_id, created_at, updated_at, icon_path
        FROM projects
        WHERE user_id = ?
        ORDER BY created_at DESC
        "#
    )
    .bind(user_id)
    .fetch_all(pool)
    .await?;

    Ok(projects)
}

pub async fn update(pool: &SqlitePool, id: i64, name: &str) -> AppResult<()> {
    sqlx::query(
        r#"
        UPDATE projects
        SET name = ?, updated_at = unixepoch()
        WHERE id = ?
        "#
    )
    .bind(name)
    .bind(id)
    .execute(pool)
    .await?;

    Ok(())
}

pub async fn delete(pool: &SqlitePool, id: i64) -> AppResult<()> {
    sqlx::query(
        r#"
        DELETE FROM projects
        WHERE id = ?
        "#
    )
    .bind(id)
    .execute(pool)
    .await?;

    Ok(())
}

pub async fn get_by_id(pool: &SqlitePool, id: i64, user_id: &str) -> AppResult<Option<Project>> {
    let project = sqlx::query_as::<_, Project>(
        r#"
        SELECT id, name, user_id, created_at, updated_at
        FROM projects 
        WHERE id = ? AND user_id = ?
        "#
    )
    .bind(id)
    .bind(user_id)
    .fetch_optional(pool)
    .await?;

    Ok(project)
}

pub async fn exists(pool: &SqlitePool, project_id: i64, user_id: &str) -> AppResult<bool> {
    let exists = sqlx::query_scalar(
        r#"
        SELECT EXISTS(SELECT 1 FROM projects WHERE id = ? AND user_id = ?)
        "#
    )
    .bind(project_id)
    .bind(user_id)
    .fetch_one(pool)
    .await?;

    Ok(exists)
} 