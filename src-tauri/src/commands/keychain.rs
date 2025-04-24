use crate::services::key_management;
use crate::error::ErrorCategory;
use tracing::info;

/// Initialize the encryption key
///
/// # Errors
/// Returns an error if there was a problem generating or storing the key
#[tauri::command]
pub fn initialize_encryption_key() -> Result<bool, ErrorCategory> {
    info!("Initializing encryption key");
    
    let key_manager = key_management::KeyManager::new()?;
    
    match key_manager.get_or_create_key() {
        Ok(_) => {
            info!("Encryption key initialized successfully");
            Ok(true)
        }
        Err(e) => {
            info!("Failed to initialize encryption key: {}", e);
            Err(ErrorCategory::KeyGeneration {
                message: "Failed to initialize encryption key".to_string(),
            })
        }
    }
}

/// Check if an encryption key exists
///
/// # Errors
/// Returns an error if there was a problem checking for the key
#[tauri::command]
pub fn has_encryption_key() -> Result<bool, ErrorCategory> {
    info!("Checking if encryption key exists");
    
    let key_manager = key_management::KeyManager::new()?;
    
    // Check both keyring and file
    let has_key = key_manager.has_key_in_keyring()? || key_manager.has_key_in_file()?;
    
    info!("Encryption key exists: {}", has_key);
    Ok(has_key)
}
