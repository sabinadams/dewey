use crate::services::storage::repositories::onboarding::OnboardingRepository;
use crate::state::AppState;
use crate::error::ErrorCategory;
use tauri::State;

/// Command to store the onboarding process in the database
/// 
/// # Errors
/// Returns a string error if there was a problem accessing the database or the onboarding could not be stored
#[tauri::command]
pub async fn store_onboarding(
    has_completed: bool,
    state: State<'_, AppState>,
) -> Result<(), ErrorCategory> {
    let onboarding_repo = OnboardingRepository::new(state.db.clone());
    onboarding_repo.store(has_completed).await
        .map(|_| ())
        .map_err(ErrorCategory::from)
}

/// Command to check if the onboarding process should run
/// 
/// # Errors
/// Returns a string error if there was a problem accessing the database or the onboarding could not be retrieved
#[tauri::command]
pub async fn should_run_onboarding(
    state: State<'_, AppState>,
) -> Result<bool, ErrorCategory> {
    let onboarding_repo = OnboardingRepository::new(state.db.clone());
    onboarding_repo.should_run().await
        .map_err(ErrorCategory::from)
}
