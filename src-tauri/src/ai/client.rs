use super::{
    AIConfig, QueryRequest, QueryResponse,
    SchemaAnalysisRequest, SchemaAnalysisResponse,
};
use crate::error::AppResult;
use reqwest::{Client, ClientBuilder};
use std::time::Duration;

pub struct AIClient {
    config: AIConfig,
    client: Client,
}

impl AIClient {
    pub fn new(config: AIConfig) -> AppResult<Self> {
        let client = ClientBuilder::new()
            .timeout(Duration::from_millis(config.timeout_ms))
            .build()?;

        Ok(Self { config, client })
    }

    pub async fn generate_query(&self, request: QueryRequest) -> AppResult<QueryResponse> {
        let response = self.client
            .post(format!("{}/query", self.config.api_endpoint))
            .header("Authorization", format!("Bearer {}", self.config.api_key))
            .json(&request)
            .send()
            .await?
            .error_for_status()?;

        Ok(response.json().await?)
    }

    pub async fn analyze_schema(&self, request: SchemaAnalysisRequest) -> AppResult<SchemaAnalysisResponse> {
        let response = self.client
            .post(format!("{}/analyze", self.config.api_endpoint))
            .header("Authorization", format!("Bearer {}", self.config.api_key))
            .json(&request)
            .send()
            .await?
            .error_for_status()?;

        Ok(response.json().await?)
    }

    pub async fn explain_query(&self, query: &str) -> AppResult<String> {
        let response = self.client
            .post(format!("{}/explain", self.config.api_endpoint))
            .header("Authorization", format!("Bearer {}", self.config.api_key))
            .json(&serde_json::json!({ "query": query }))
            .send()
            .await?
            .error_for_status()?;

        let explanation: serde_json::Value = response.json().await?;
        Ok(explanation["explanation"].as_str().unwrap_or("No explanation available").to_string())
    }
} 