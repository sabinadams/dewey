use keyring::Entry;
use rand::{rngs::OsRng, RngCore};
use std::path::PathBuf;
use std::fs;
use base64::{engine::general_purpose::STANDARD as BASE64, Engine};
use tracing::debug;
use directories::ProjectDirs;
use crate::constants::keys::{SERVICE_NAME, ACCOUNT_NAME, FILE_NAME};
use crate::error::{AppError, AppResult, ErrorSeverity, KeyManagementSubcategory, KeyringSubcategory, IoSubcategory, ConfigSubcategory};
use std::sync::Arc;
use tokio::sync::Mutex;

/// Manages the encryption key, attempting to store it in the system keyring first,
/// falling back to an encrypted file in the app's config directory if necessary
pub struct KeyManager {
    keyring_entry: Entry,
    key_file_path: PathBuf,
    key: Arc<Mutex<Option<Vec<u8>>>>,
}

impl KeyManager {
    pub fn new() -> AppResult<Self> {
        let keyring_entry = Entry::new(SERVICE_NAME, ACCOUNT_NAME)
            .map_err(|e| AppError::keyring(
                e.to_string(),
                KeyringSubcategory::KeyringUnavailable,
                ErrorSeverity::Error,
            ))?;

        let key_file_path = Self::get_key_file_path()?;

        Ok(Self {
            keyring_entry,
            key_file_path,
            key: Arc::new(Mutex::new(None)),
        })
    }

    /// Gets the encryption key, generating and storing a new one if it doesn't exist
    pub async fn get_or_create_key(&self) -> AppResult<Vec<u8>> {
        // Try to get the key from the system keyring first
        match self.get_key_from_keyring() {
            Ok(key) => {
                debug!("Retrieved encryption key from system keyring");
                Ok(key)
            }
            Err(e) => {
                debug!("Could not retrieve key from keyring: {}", e);
                // Fall back to file-based storage
                match self.get_key_from_file() {
                    Ok(key) => {
                        debug!("Retrieved encryption key from file");
                        Ok(key)
                    }
                    Err(e) => {
                        debug!("Could not retrieve key from file: {}", e);
                        // Generate and store a new key if none exists
                        let new_key = self.generate_new_key()?;
                        self.store_key(&new_key)?;
                        Ok(new_key)
                    }
                }
            }
        }
    }

    /// Check if a key exists in the keyring
    pub fn has_key_in_keyring(&self) -> AppResult<bool> {
        match self.keyring_entry.get_password() {
            Ok(_) => Ok(true),
            Err(_) => Ok(false)
        }
    }

    /// Check if a key exists in the fallback file
    pub fn has_key_in_file(&self) -> AppResult<bool> {
        Ok(self.key_file_path.exists())
    }

    fn get_key_from_keyring(&self) -> AppResult<Vec<u8>> {
        let key_str = self.keyring_entry
            .get_password()
            .map_err(|e| AppError::keyring(
                e.to_string(),
                KeyringSubcategory::KeyNotFound,
                ErrorSeverity::Error,
            ))?;
        
        let key_bytes = BASE64.decode(key_str)
            .map_err(|e| AppError::keyring(
                e.to_string(),
                KeyringSubcategory::InvalidKey,
                ErrorSeverity::Error,
            ))?;
        
        Ok(key_bytes)
    }

    fn get_key_from_file(&self) -> AppResult<Vec<u8>> {
        let key_str = fs::read_to_string(&self.key_file_path)
            .map_err(|e| AppError::io(
                e.to_string(),
                IoSubcategory::ReadFailed,
                ErrorSeverity::Error,
            ))?;
        
        let key_bytes = BASE64.decode(key_str.trim())
            .map_err(|e| AppError::key_generation(
                e.to_string(),
                KeyManagementSubcategory::InvalidLength,
                ErrorSeverity::Error,
            ))?;
        
        Ok(key_bytes)
    }

    fn generate_new_key(&self) -> AppResult<Vec<u8>> {
        let mut key = Vec::new();
        OsRng.fill_bytes(&mut key);
        Ok(key)
    }

    fn store_key(&self, key: &[u8]) -> AppResult<()> {
        let key_str = BASE64.encode(key);
        
        // Try to store in system keyring first
        match self.keyring_entry.set_password(&key_str) {
            Ok(_) => {
                debug!("Stored encryption key in system keyring");
                Ok(())
            }
            Err(e) => {
                debug!("Failed to store key in keyring, falling back to file: {}", e);
                // Fall back to file storage
                if let Some(parent) = self.key_file_path.parent() {
                    fs::create_dir_all(parent)
                        .map_err(|e| AppError::io(
                            e.to_string(),
                            IoSubcategory::WriteFailed,
                            ErrorSeverity::Error,
                        ))?;
                }
                
                fs::write(&self.key_file_path, key_str)
                    .map_err(|e| AppError::key_generation(
                        e.to_string(),
                        KeyManagementSubcategory::StorageFailed,
                        ErrorSeverity::Error,
                    ))?;
                
                debug!("Stored encryption key in file");
                Ok(())
            }
        }
    }

    fn get_key_file_path() -> AppResult<PathBuf> {
        let proj_dirs = ProjectDirs::from("com", "dewey", "dewey")
            .ok_or_else(|| AppError::config(
                "Could not determine project directories",
                ConfigSubcategory::ParseError,
                ErrorSeverity::Error,
            ))?;
        
        Ok(proj_dirs.config_dir().join(FILE_NAME))
    }

    pub async fn set_key(&self, key: Vec<u8>) -> AppResult<()> {
        let mut key_guard = self.key.lock().await;
        *key_guard = Some(key);
        Ok(())
    }

    pub async fn get_key(&self) -> AppResult<Vec<u8>> {
        self.key
            .lock()
            .await
            .clone()
            .ok_or_else(|| AppError::key_management(
                "Key not initialized".to_string(),
                KeyManagementSubcategory::KeyNotInitialized,
                ErrorSeverity::Error,
            ))
    }
} 