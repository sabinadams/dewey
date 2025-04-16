use crate::error::AppResult;
use async_trait::async_trait;
use serde::{Deserialize, Serialize};

mod client;
pub use client::AIClient;

#[derive(Debug, Serialize, Deserialize)]
pub struct AIConfig {
    pub api_endpoint: String,
    pub api_key: String,
    pub timeout_ms: u64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct QueryRequest {
    pub natural_language: String,
    pub database_type: String,
    pub available_tables: Vec<String>,
    pub recent_queries: Vec<String>,
    pub user_preferences: Option<UserPreferences>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct QueryResponse {
    pub sql: String,
    pub explanation: String,
    pub confidence_score: f32,
    pub alternative_approaches: Vec<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SchemaAnalysisRequest {
    pub database_type: String,
    pub tables: Vec<TableInfo>,
    pub relationships: Vec<RelationshipInfo>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TableInfo {
    pub name: String,
    pub columns: Vec<ColumnInfo>,
    pub row_count: Option<i64>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ColumnInfo {
    pub name: String,
    pub data_type: String,
    pub is_nullable: bool,
    pub is_primary: bool,
    pub has_index: bool,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RelationshipInfo {
    pub table_from: String,
    pub column_from: String,
    pub table_to: String,
    pub column_to: String,
    pub relationship_type: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SchemaAnalysisResponse {
    pub suggestions: Vec<Suggestion>,
    pub potential_issues: Vec<Issue>,
    pub optimization_opportunities: Vec<Optimization>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Suggestion {
    pub category: String,
    pub description: String,
    pub impact: String,
    pub implementation_difficulty: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Issue {
    pub severity: String,
    pub description: String,
    pub recommendation: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Optimization {
    pub target: String,
    pub description: String,
    pub expected_improvement: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UserPreferences {
    pub preferred_query_style: String,
    pub max_results: Option<i32>,
    pub include_explanations: bool,
} 