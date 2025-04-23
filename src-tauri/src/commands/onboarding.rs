use crate::services::storage::repositories::onboarding::OnboardingRepository;
use crate::state::AppState;
use dewey_macros::command;
use tauri::State;
use tracing::error;

/// Command to store the onboarding process in the database
/// 
/// # Errors
/// Returns a string error if there was a problem accessing the database or the onboarding could not be stored
#[command]
pub async fn store_onboarding(
    has_completed: bool,
    state: State<'_, AppState>,
) -> Result<(), String> {
    let onboarding_repo = OnboardingRepository::new(state.db.clone());
    let onboarding = onboarding_repo.store(has_completed).await;

    match onboarding {
        Ok(_) => Ok(()),
        Err(e) => {
            error!("Failed to store onboarding: {}", e);
            Err(e.to_string())
        }
    }
}

/// Command to check if the onboarding process should run
/// 
/// # Errors
/// Returns a string error if there was a problem accessing the database or the onboarding could not be retrieved
#[command]
pub async fn should_run_onboarding(
    state: State<'_, AppState>,
) -> Result<bool, String> {
    let onboarding_repo = OnboardingRepository::new(state.db.clone());
    let onboarding = onboarding_repo.should_run().await;

    match onboarding {
        Ok(should_run) => Ok(should_run),
        Err(e) => {
            error!("Failed to check if onboarding should run: {}", e);
            Err(e.to_string())
        }
    }
}
