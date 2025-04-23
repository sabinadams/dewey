use crate::{
    services::storage::repositories::onboarding::OnboardingRepository,
    AppState,
};
use tauri::{AppHandle, State};
use tracing::error;

/// Command to store the onboarding process in the database
/// 
/// # Errors
/// Returns a string error if there was a problem accessing the database or the onboarding could not be stored
#[tauri::command]
pub async fn store_onboarding(
    has_completed: bool,
    app: AppHandle,
    state: State<'_, AppState>,
) -> Result<(), String> {
    let onboarding_repo = OnboardingRepository::new(state.db.clone(), app.clone());
    let version = app.package_info().version.to_string();

    let onboarding = onboarding_repo.store(has_completed, version).await;

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
#[tauri::command]
pub async fn should_run_onboarding(
    app: AppHandle,
    state: State<'_, AppState>,
) -> Result<bool, String> {
    let onboarding_repo = OnboardingRepository::new(state.db.clone(), app.clone());
    let onboarding = onboarding_repo.should_run().await;

    match onboarding {
        Ok(should_run) => Ok(should_run),
        Err(e) => {
            error!("Failed to check if onboarding should run: {}", e);
            Err(e.to_string())
        }
    }
}
