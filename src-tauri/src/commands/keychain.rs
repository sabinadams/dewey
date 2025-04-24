use crate::services::key_management;
use crate::error::{AppError, AppResult, ErrorSeverity};
use crate::error::categories::KeyManagementSubcategory;
use tracing::{info, debug, error};

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
            Err(AppError::key_management(
                "Failed to initialize encryption key".to_string(),
                KeyManagementSubcategory::KeyGenerationFailed,
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
    match key_manager.get_or_create_key().await {
        Ok(_) => {
            debug!("Key exists");
            Ok(true)
        }
        Err(e) => {
            error!("Error checking key: {}", e);
            Ok(false)
        }
    }
}
