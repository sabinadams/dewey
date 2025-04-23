use crate::services::{encryption, key_management};
use tracing::{info, error};

#[tauri::command]
pub fn initialize_encryption_key() -> Result<bool, String> {
    info!("Initializing encryption key...");
    
    // First check if a key already exists
    match key_management::KeyManager::new() {
        Ok(manager) => {
            match (manager.has_key_in_keyring(), manager.has_key_in_file()) {
                (Ok(true), _) | (_, Ok(true)) => {
                    info!("Encryption key already exists");
                    Ok(false) // Return false to indicate key already existed
                }
                _ => {
                    // No key exists, create one
                    encryption::initialize_encryption_key().map(|_| {
                        info!("Successfully created new encryption key");
                        true // Return true to indicate new key was created
                    }).map_err(|e| {
                        error!("Failed to initialize encryption key: {}", e);
                        e.to_string()
                    })
                }
            }
        }
        Err(e) => {
            error!("Failed to initialize key manager: {}", e);
            Err(e.to_string())
        }
    }
}

#[tauri::command]
pub fn has_encryption_key() -> Result<bool, String> {
    info!("Checking if encryption key exists...");
    match key_management::KeyManager::new() {
        Ok(manager) => {
            // Check both keyring and file without creating a new key
            match manager.has_key_in_keyring() {
                Ok(true) => {
                    info!("Found encryption key in keyring");
                    Ok(true)
                }
                Ok(false) => {
                    // Check fallback file
                    match manager.has_key_in_file() {
                        Ok(true) => {
                            info!("Found encryption key in file");
                            Ok(true)
                        }
                        Ok(false) => {
                            info!("No encryption key found");
                            Ok(false)
                        }
                        Err(e) => {
                            error!("Failed to check for key in file: {}", e);
                            Err(e.to_string())
                        }
                    }
                }
                Err(e) => {
                    error!("Failed to check for key in keyring: {}", e);
                    Err(e.to_string())
                }
            }
        }
        Err(e) => {
            error!("Failed to initialize key manager: {}", e);
            Err(e.to_string())
        }
    }
}
