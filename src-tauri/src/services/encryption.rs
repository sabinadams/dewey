use aes_gcm::{
    aead::{Aead, KeyInit},
    Aes256Gcm, Key, Nonce,
};
use base64::{engine::general_purpose::STANDARD as BASE64, Engine};
use rand::{rngs::OsRng, RngCore};
use serde::{Deserialize, Serialize};
use serde_json;
use std::sync::{Arc, OnceLock};
use tracing::{debug, error};
use crate::error::{AppError, AppResult, ErrorSeverity};
use crate::error::categories::{ErrorCategory, EncryptionSubcategory};
use super::key_management::KeyManager;

static ENCRYPTION_KEY: OnceLock<Arc<[u8; 32]>> = OnceLock::new();

#[derive(Serialize, Deserialize)]
struct EncryptedData {
    nonce: String,
    ciphertext: String,
}

/// Initialize the encryption key. This should be called once at application startup.
pub async fn initialize_encryption_key() -> AppResult<()> {
    let key_manager = KeyManager::new()?;
    match key_manager.get_or_create_key().await {
        Ok(key) => {
            debug!("Successfully initialized encryption key");
            if ENCRYPTION_KEY.set(Arc::new(key.try_into().unwrap())).is_err() {
                error!("Encryption key already initialized");
            }
            Ok(())
        }
        Err(e) => {
            error!("Failed to initialize encryption key: {}", e);
            Err(e)
        }
    }
}

/// Get the encryption key
fn get_encryption_key() -> AppResult<Arc<[u8; 32]>> {
    ENCRYPTION_KEY.get()
        .map(Arc::clone)
        .ok_or_else(|| AppError::new(
            "Encryption key not found",
            ErrorCategory::Encryption(EncryptionSubcategory::KeyNotFound),
            ErrorSeverity::Error
        ))
}

/// Encrypt a string value
pub fn encrypt_string(value: &str) -> AppResult<String> {
    let key = get_encryption_key()?;
    let cipher = Aes256Gcm::new(Key::<Aes256Gcm>::from_slice(&*key));
    
    // Generate a random 96-bits nonce
    let mut nonce = [0u8; 12];
    OsRng.fill_bytes(&mut nonce);
    
    let ciphertext = cipher
        .encrypt(Nonce::from_slice(&nonce), value.as_bytes())
        .map_err(|e| AppError::new(
            e.to_string(),
            ErrorCategory::Encryption(EncryptionSubcategory::EncryptionFailed),
            ErrorSeverity::Error
        ))?;

    let encrypted_data = EncryptedData {
        nonce: BASE64.encode(nonce),
        ciphertext: BASE64.encode(ciphertext),
    };

    serde_json::to_string(&encrypted_data)
        .map_err(|e| AppError::new(
            e.to_string(),
            ErrorCategory::Encryption(EncryptionSubcategory::SerializationFailed),
            ErrorSeverity::Error
        ))
}

/// Decrypt a string value
pub fn decrypt_string(encrypted_value: &str) -> AppResult<String> {
    let key = get_encryption_key()?;
    let cipher = Aes256Gcm::new(Key::<Aes256Gcm>::from_slice(&*key));

    let encrypted_data: EncryptedData = serde_json::from_str(encrypted_value)
        .map_err(|e| AppError::new(
            e.to_string(),
            ErrorCategory::Encryption(EncryptionSubcategory::DeserializationFailed),
            ErrorSeverity::Error
        ))?;

    let nonce = BASE64
        .decode(encrypted_data.nonce)
        .map_err(|e| AppError::new(
            e.to_string(),
            ErrorCategory::Encryption(EncryptionSubcategory::Base64DecodeFailed),
            ErrorSeverity::Error
        ))?;
    let ciphertext = BASE64
        .decode(encrypted_data.ciphertext)
        .map_err(|e| AppError::new(
            e.to_string(),
            ErrorCategory::Encryption(EncryptionSubcategory::Base64DecodeFailed),
            ErrorSeverity::Error
        ))?;

    let plaintext = cipher
        .decrypt(Nonce::from_slice(&nonce), ciphertext.as_ref())
        .map_err(|e| AppError::new(
            e.to_string(),
            ErrorCategory::Encryption(EncryptionSubcategory::DecryptionFailed),
            ErrorSeverity::Error
        ))?;

    String::from_utf8(plaintext)
        .map_err(|e| AppError::new(
            e.to_string(),
            ErrorCategory::Encryption(EncryptionSubcategory::Utf8DecodeFailed),
            ErrorSeverity::Error
        ))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_encryption_decryption() {
        // Initialize the encryption key
        let key = vec![0u8; 32];
        ENCRYPTION_KEY.set(Arc::new(key.try_into().unwrap())).unwrap();
    
        // Test encryption and decryption
        let original = "Hello, World!";
        let encrypted = encrypt_string(original).unwrap();
        let decrypted = decrypt_string(&encrypted).unwrap();
    
        assert_eq!(original, decrypted);
    }
} 