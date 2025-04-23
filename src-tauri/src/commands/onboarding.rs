use crate::{
    constants,
    services::storage::repositories::onboarding::{Onboarding, OnboardingRepository},
    utils,
    AppState,
};
use blake3;
use tauri::State;
use tracing::{error, info};

/// Command to store the onboarding process in the database
/// 
/// # Errors
/// Returns a string error if there was a problem accessing the database or the onboarding could not be stored
#[tauri::command]
pub async fn store_onboarding(
    has_completed: bool,
    last_version: String,
    state: State<'_, AppState>,
) -> Result<(), String> {
    let onboarding_repo = OnboardingRepository::new(state.db.clone());

    let onboarding = onboarding_repo.store(has_completed, last_version).await;

    match onboarding {
        Ok(_) => Ok(()),
        Err(e) => {
            error!("Failed to store onboarding: {}", e);
            Err(e.to_string())
        }
    }
}
