use keyring::Entry;
use rand::{rngs::OsRng, RngCore};
use std::path::PathBuf;
use std::fs;
use base64::{engine::general_purpose::STANDARD as BASE64, Engine};
use tracing::debug;
use directories::ProjectDirs;
use crate::constants::{KEY_SERVICE_NAME, KEY_ACCOUNT_NAME, KEY_FILE_NAME};
use crate::error::AppError;

/// Manages the encryption key, attempting to store it in the system keyring first,
/// falling back to an encrypted file in the app's config directory if necessary
pub struct KeyManager {
    keyring_entry: Entry,
    key_file_path: PathBuf,
}

impl KeyManager {
    pub fn new() -> Result<Self, AppError> {
        let keyring_entry = Entry::new(KEY_SERVICE_NAME, KEY_ACCOUNT_NAME)
            .map_err(|e| AppError::Keyring(e.to_string()))?;

        let key_file_path = Self::get_key_file_path()?;

        Ok(Self {
            keyring_entry,
            key_file_path,
        })
    }

    /// Gets the encryption key, generating and storing a new one if it doesn't exist
    pub fn get_or_create_key(&self) -> Result<[u8; 32], AppError> {
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
    pub fn has_key_in_keyring(&self) -> Result<bool, AppError> {
        match self.keyring_entry.get_password() {
            Ok(_) => Ok(true),
            Err(_) => Ok(false)
        }
    }

    /// Check if a key exists in the fallback file
    pub fn has_key_in_file(&self) -> Result<bool, AppError> {
        Ok(self.key_file_path.exists())
    }

    fn get_key_from_keyring(&self) -> Result<[u8; 32], AppError> {
        let key_str = self.keyring_entry
            .get_password()
            .map_err(|e| AppError::Keyring(e.to_string()))?;
        
        let key_bytes = BASE64.decode(key_str)
            .map_err(|e| AppError::Keyring(e.to_string()))?;
        
        let mut key = [0u8; 32];
        key.copy_from_slice(&key_bytes);
        Ok(key)
    }

    fn get_key_from_file(&self) -> Result<[u8; 32], AppError> {
        let key_str = fs::read_to_string(&self.key_file_path)
            .map_err(AppError::Io)?;
        
        let key_bytes = BASE64.decode(key_str.trim())
            .map_err(|e| AppError::KeyGeneration(e.to_string()))?;
        
        let mut key = [0u8; 32];
        key.copy_from_slice(&key_bytes);
        Ok(key)
    }

    fn generate_new_key(&self) -> Result<[u8; 32], AppError> {
        let mut key = [0u8; 32];
        OsRng.fill_bytes(&mut key);
        Ok(key)
    }

    fn store_key(&self, key: &[u8; 32]) -> Result<(), AppError> {
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
                        .map_err(AppError::Io)?;
                }
                
                fs::write(&self.key_file_path, key_str)
                    .map_err(AppError::Io)?;
                
                debug!("Stored encryption key in file");
                Ok(())
            }
        }
    }

    fn get_key_file_path() -> Result<PathBuf, AppError> {
        let proj_dirs = ProjectDirs::from("com", "dewey", "dewey")
            .ok_or_else(|| AppError::Config("Could not determine project directories".to_string()))?;
        
        Ok(proj_dirs.config_dir().join(KEY_FILE_NAME))
    }
} 