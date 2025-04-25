use crate::services::key_management;
use crate::error::{AppError, AppResult, ErrorSeverity};
use crate::error::categories::{KeyManagementSubcategory, KeyringSubcategory, ErrorCategory};
use tracing::{info, error};

/// Initialize the encryption key
///
/// # Errors
/// Returns an error if there was a problem generating or storing the key
#[tauri::command]
pub async fn initialize_encryption_key() -> AppResult<bool> {
    info!("Initializing encryption key");
    
    let key_manager = key_management::KeyManager::new()?;
    
    match key_manager.get_or_create_key().await {
        Ok(_) => {
            info!("Encryption key initialized successfully");
            Ok(true)
        }
        Err(e) => {
            info!("Failed to initialize encryption key: {}", e);
            Err(AppError::new(
                "Failed to initialize encryption key".to_string(),
                ErrorCategory::KeyManagement(KeyManagementSubcategory::KeyGenerationFailed),
                ErrorSeverity::Error,
            ))
        }
    }
}

/// Check if an encryption key exists
///
/// # Errors
/// Returns an error if there was a problem checking for the key
#[tauri::command]
pub async fn has_encryption_key() -> AppResult<bool> {
    let key_manager = key_management::KeyManager::new()?;
    match key_manager.has_key_in_keyring() {
        Ok(true) => {
            info!("Found encryption key in keyring");
            Ok(true)
        }
        Ok(false) => {
            info!("No encryption key found");
            Ok(false)
        }
        Err(e) => {
            error!("Failed to check for key in keyring: {}", e);
            Err(AppError::new(
                "Failed to check for key in keyring".to_string(),
                ErrorCategory::Keyring(KeyringSubcategory::KeyringUnavailable),
                ErrorSeverity::Error,
            ))
        }
    }
}
