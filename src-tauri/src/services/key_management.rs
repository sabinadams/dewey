use keyring::Entry;
use rand::{rngs::OsRng, RngCore};
use base64::{engine::general_purpose::STANDARD as BASE64, Engine};
use tracing::debug;
use crate::constants::keys::{SERVICE_NAME, ACCOUNT_NAME};
use crate::error::{AppError, AppResult, ErrorSeverity};
use crate::error::categories::{
    KeyringSubcategory,
    ErrorCategory
};

/// Manages the encryption key in the system keyring
pub struct KeyManager {
    keyring_entry: Entry,
}

impl KeyManager {
    pub fn new() -> AppResult<Self> {
        let keyring_entry = Entry::new(SERVICE_NAME, ACCOUNT_NAME)
            .map_err(|e| AppError::new(
                e.to_string(),
                ErrorCategory::Keyring(KeyringSubcategory::KeyringUnavailable),
                ErrorSeverity::Error,
            ))?;

        Ok(Self {
            keyring_entry,
        })
    }

    /// Gets the encryption key, generating and storing a new one if it doesn't exist
    pub async fn get_or_create_key(&self) -> AppResult<Vec<u8>> {
        // Try to get the key from the system keyring
        match self.get_key_from_keyring() {
            Ok(key) => {
                debug!("Retrieved encryption key from system keyring");
                Ok(key)
            }
            Err(_) => {
                // Generate and store a new key if none exists
                let new_key = self.generate_new_key()?;
                self.store_key(&new_key)?;
                Ok(new_key)
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

    /// Get the key from the keyring
    pub fn get_key_from_keyring(&self) -> AppResult<Vec<u8>> {
        let key_str = self.keyring_entry
            .get_password()
            .map_err(|e| AppError::new(
                e.to_string(),
                ErrorCategory::Keyring(KeyringSubcategory::KeyNotFound),
                ErrorSeverity::Error,
            ))?;
        
        let key_bytes = BASE64.decode(key_str)
            .map_err(|e| AppError::new(
                e.to_string(),
                ErrorCategory::Keyring(KeyringSubcategory::InvalidKey),
                ErrorSeverity::Error,
            ))?;
        
        Ok(key_bytes)
    }

    fn generate_new_key(&self) -> AppResult<Vec<u8>> {
        let mut key = vec![0u8; 32];  // Ensure 32 bytes for AES-256
        OsRng.fill_bytes(&mut key);
        Ok(key)
    }

    fn store_key(&self, key: &[u8]) -> AppResult<()> {
        let key_str = BASE64.encode(key);
        
        self.keyring_entry.set_password(&key_str)
            .map_err(|e| AppError::new(
                e.to_string(),
                ErrorCategory::Keyring(KeyringSubcategory::KeyNotFound),
                ErrorSeverity::Error,
            ))?;
        
        debug!("Stored encryption key in system keyring");
        Ok(())
    }
} 