use aes_gcm::{
    aead::{Aead, KeyInit},
    Aes256Gcm, Key, Nonce,
};
use base64::{engine::general_purpose::STANDARD as BASE64, Engine};
use rand::{rngs::OsRng, RngCore};
use serde::{Deserialize, Serialize};
use serde_json;
use std::sync::{Arc, OnceLock};
use thiserror::Error;
use tracing::{debug, error};
use crate::error::AppError;

use super::key_management::KeyManager;

static ENCRYPTION_KEY: OnceLock<Arc<[u8; 32]>> = OnceLock::new();

#[derive(Error, Debug)]
pub enum EncryptionError {
    #[error("Encryption failed: {0}")]
    EncryptionFailed(String),
    #[error("Decryption failed: {0}")]
    DecryptionFailed(String),
    #[error("Key initialization failed: {0}")]
    KeyInitializationFailed(String),
}

impl From<AppError> for EncryptionError {
    fn from(error: AppError) -> Self {
        EncryptionError::KeyInitializationFailed(error.to_string())
    }
}

#[derive(Serialize, Deserialize)]
struct EncryptedData {
    nonce: String,
    ciphertext: String,
}

/// Initialize the encryption key. This should be called once at application startup.
pub fn initialize_encryption_key() -> Result<(), EncryptionError> {
    match KeyManager::new().and_then(|km| km.get_or_create_key()) {
        Ok(key) => {
            debug!("Successfully initialized encryption key");
            if ENCRYPTION_KEY.set(Arc::new(key)).is_err() {
                error!("Encryption key already initialized");
            }
            Ok(())
        }
        Err(e) => {
            error!("Failed to initialize encryption key: {}", e);
            Err(e.into())
        }
    }
}

/// Get the encryption key
fn get_encryption_key() -> Result<Arc<[u8; 32]>, EncryptionError> {
    ENCRYPTION_KEY.get()
        .map(Arc::clone)
        .ok_or_else(|| EncryptionError::KeyInitializationFailed("Encryption key not initialized".to_string()))
}

/// Encrypt a string value
pub fn encrypt_string(value: &str) -> Result<String, EncryptionError> {
    let key = get_encryption_key()?;
    let cipher = Aes256Gcm::new(Key::<Aes256Gcm>::from_slice(&*key));
    
    // Generate a random 96-bits nonce
    let mut nonce = [0u8; 12];
    OsRng.fill_bytes(&mut nonce);
    
    let ciphertext = cipher
        .encrypt(Nonce::from_slice(&nonce), value.as_bytes())
        .map_err(|e| EncryptionError::EncryptionFailed(e.to_string()))?;

    let encrypted_data = EncryptedData {
        nonce: BASE64.encode(nonce),
        ciphertext: BASE64.encode(ciphertext),
    };

    serde_json::to_string(&encrypted_data)
        .map_err(|e| EncryptionError::EncryptionFailed(e.to_string()))
}

/// Decrypt a string value
pub fn decrypt_string(encrypted_value: &str) -> Result<String, EncryptionError> {
    let key = get_encryption_key()?;
    let cipher = Aes256Gcm::new(Key::<Aes256Gcm>::from_slice(&*key));

    let encrypted_data: EncryptedData = serde_json::from_str(encrypted_value)
        .map_err(|e| EncryptionError::DecryptionFailed(e.to_string()))?;

    let nonce = BASE64
        .decode(encrypted_data.nonce)
        .map_err(|e| EncryptionError::DecryptionFailed(e.to_string()))?;
    let ciphertext = BASE64
        .decode(encrypted_data.ciphertext)
        .map_err(|e| EncryptionError::DecryptionFailed(e.to_string()))?;

    let plaintext = cipher
        .decrypt(Nonce::from_slice(&nonce), ciphertext.as_ref())
        .map_err(|e| EncryptionError::DecryptionFailed(e.to_string()))?;

    String::from_utf8(plaintext)
        .map_err(|e| EncryptionError::DecryptionFailed(e.to_string()))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_encryption_decryption() {
        initialize_encryption_key().unwrap();
        
        let original = "sensitive data";
        let encrypted = encrypt_string(original).unwrap();
        let decrypted = decrypt_string(&encrypted).unwrap();
        
        assert_eq!(original, decrypted);
        assert_ne!(encrypted, original);
    }
} 