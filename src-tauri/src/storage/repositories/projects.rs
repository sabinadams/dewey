use crate::error::AppResult;
use crate::storage::models::Project;
use sqlx::{Pool, Sqlite};

pub struct ProjectRepository<'a> {
    pool: &'a Pool<Sqlite>,
}

impl<'a> ProjectRepository<'a> {
    pub fn new(pool: &'a Pool<Sqlite>) -> Self {
        Self { pool }
    }

    pub async fn create(&self, name: &str, user_id: &str) -> AppResult<i64> {
        let project = sqlx::query_as!(
            Project,
            r#"
            INSERT INTO projects (name, user_id)
            VALUES (?, ?)
            RETURNING *
            "#,
            name,
            user_id
        )
        .fetch_one(self.pool)
        .await?;

        Ok(project.id)
    }

    pub async fn get_by_id(&self, id: i64, user_id: &str) -> AppResult<Option<Project>> {
        let project = sqlx::query_as!(
            Project,
            r#"
            SELECT * FROM projects 
            WHERE id = ? AND user_id = ?
            "#,
            id,
            user_id
        )
        .fetch_optional(self.pool)
        .await?;

        Ok(project)
    }

    pub async fn get_user_projects(&self, user_id: &str) -> AppResult<Vec<Project>> {
        let projects = sqlx::query_as!(
            Project,
            r#"
            SELECT * FROM projects 
            WHERE user_id = ? 
            ORDER BY updated_at DESC
            "#,
            user_id
        )
        .fetch_all(self.pool)
        .await?;

        Ok(projects)
    }

    pub async fn update(&self, project: &Project) -> AppResult<()> {
        let now = chrono::Utc::now().timestamp();
        
        sqlx::query!(
            r#"
            UPDATE projects 
            SET name = ?,
                updated_at = ?
            WHERE id = ? AND user_id = ?
            "#,
            project.name,
            now,
            project.id,
            project.user_id
        )
        .execute(self.pool)
        .await?;

        Ok(())
    }

    pub async fn delete(&self, project_id: i64, user_id: &str) -> AppResult<bool> {
        let result = sqlx::query!(
            r#"
            DELETE FROM projects 
            WHERE id = ? AND user_id = ?
            "#,
            project_id,
            user_id
        )
        .execute(self.pool)
        .await?;

        Ok(result.rows_affected() > 0)
    }

    pub async fn exists(&self, project_id: i64, user_id: &str) -> AppResult<bool> {
        let exists = sqlx::query_scalar!(
            r#"
            SELECT EXISTS(SELECT 1 FROM projects WHERE id = ? AND user_id = ?)
            "#,
            project_id,
            user_id
        )
        .fetch_one(self.pool)
        .await?;

        Ok(exists)
    }
} 