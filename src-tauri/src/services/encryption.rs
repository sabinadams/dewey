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
use crate::error::{ErrorCategory, ErrorSeverity};
use crate::error_subcategories::EncryptionSubcategory;
use tokio::sync::Mutex;

use super::key_management::KeyManager;

static ENCRYPTION_KEY: OnceLock<Arc<[u8; 32]>> = OnceLock::new();

#[derive(Serialize, Deserialize)]
struct EncryptedData {
    nonce: String,
    ciphertext: String,
}

/// Initialize the encryption key. This should be called once at application startup.
pub async fn initialize_encryption_key() -> Result<(), ErrorCategory> {
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
fn get_encryption_key() -> Result<Arc<[u8; 32]>, ErrorCategory> {
    ENCRYPTION_KEY.get()
        .map(Arc::clone)
        .ok_or_else(|| ErrorCategory::Encryption {
            message: "Encryption key not initialized".to_string(),
            subcategory: Some(EncryptionSubcategory::KeyNotInitialized),
            code: 14000,
            severity: ErrorSeverity::Error,
        })
}

/// Encrypt a string value
pub fn encrypt_string(value: &str) -> Result<String, ErrorCategory> {
    let key = get_encryption_key()?;
    let cipher = Aes256Gcm::new(Key::<Aes256Gcm>::from_slice(&*key));
    
    // Generate a random 96-bits nonce
    let mut nonce = [0u8; 12];
    OsRng.fill_bytes(&mut nonce);
    
    let ciphertext = cipher
        .encrypt(Nonce::from_slice(&nonce), value.as_bytes())
        .map_err(|e| ErrorCategory::Encryption {
            message: e.to_string(),
            subcategory: Some(EncryptionSubcategory::EncryptionFailed),
            code: 14001,
            severity: ErrorSeverity::Error,
        })?;

    let encrypted_data = EncryptedData {
        nonce: BASE64.encode(nonce),
        ciphertext: BASE64.encode(ciphertext),
    };

    serde_json::to_string(&encrypted_data)
        .map_err(|e| ErrorCategory::Encryption {
            message: e.to_string(),
            subcategory: Some(EncryptionSubcategory::SerializationFailed),
            code: 14002,
            severity: ErrorSeverity::Error,
        })
}

/// Decrypt a string value
pub fn decrypt_string(encrypted_value: &str) -> Result<String, ErrorCategory> {
    let key = get_encryption_key()?;
    let cipher = Aes256Gcm::new(Key::<Aes256Gcm>::from_slice(&*key));

    let encrypted_data: EncryptedData = serde_json::from_str(encrypted_value)
        .map_err(|e| ErrorCategory::Encryption {
            message: e.to_string(),
            subcategory: Some(EncryptionSubcategory::DeserializationFailed),
            code: 14003,
            severity: ErrorSeverity::Error,
        })?;

    let nonce = BASE64
        .decode(encrypted_data.nonce)
        .map_err(|e| ErrorCategory::Encryption {
            message: e.to_string(),
            subcategory: Some(EncryptionSubcategory::Base64DecodeFailed),
            code: 14004,
            severity: ErrorSeverity::Error,
        })?;
    let ciphertext = BASE64
        .decode(encrypted_data.ciphertext)
        .map_err(|e| ErrorCategory::Encryption {
            message: e.to_string(),
            subcategory: Some(EncryptionSubcategory::Base64DecodeFailed),
            code: 14004,
            severity: ErrorSeverity::Error,
        })?;

    let plaintext = cipher
        .decrypt(Nonce::from_slice(&nonce), ciphertext.as_ref())
        .map_err(|e| ErrorCategory::Encryption {
            message: e.to_string(),
            subcategory: Some(EncryptionSubcategory::DecryptionFailed),
            code: 14005,
            severity: ErrorSeverity::Error,
        })?;

    String::from_utf8(plaintext)
        .map_err(|e| ErrorCategory::Encryption {
            message: e.to_string(),
            subcategory: Some(EncryptionSubcategory::Utf8DecodeFailed),
            code: 14006,
            severity: ErrorSeverity::Error,
        })
}

pub struct EncryptionService {
    key: Arc<Mutex<Option<Vec<u8>>>>,
}

impl EncryptionService {
    pub fn new() -> Self {
        Self {
            key: Arc::new(Mutex::new(None)),
        }
    }

    pub async fn initialize_key(&self, key: Vec<u8>) {
        let mut key_guard = self.key.lock().await;
        *key_guard = Some(key);
    }

    pub async fn get_key(&self) -> Result<Vec<u8>, ErrorCategory> {
        let key = self.key
            .lock()
            .await
            .clone()
            .ok_or_else(|| ErrorCategory::Encryption {
                message: "Encryption key not initialized".to_string(),
                subcategory: Some(EncryptionSubcategory::KeyNotInitialized),
                code: 14000,
                severity: ErrorSeverity::Error,
            })?;
        Ok(key)
    }

    pub async fn encrypt(&self, data: &[u8]) -> Result<Vec<u8>, ErrorCategory> {
        let key = self.get_key().await?;
        let cipher = Aes256Gcm::new_from_slice(&key).map_err(|e| ErrorCategory::Encryption {
            message: e.to_string(),
            subcategory: Some(EncryptionSubcategory::InvalidKey),
            code: 14001,
            severity: ErrorSeverity::Error,
        })?;

        let mut nonce = [0u8; 12];
        rand::thread_rng().fill_bytes(&mut nonce);
        let nonce = Nonce::from_slice(&nonce);

        let encrypted_data = cipher
            .encrypt(nonce, data)
            .map_err(|e| ErrorCategory::Encryption {
                message: e.to_string(),
                subcategory: Some(EncryptionSubcategory::EncryptionFailed),
                code: 14002,
                severity: ErrorSeverity::Error,
            })?;

        // Prepend the nonce to the encrypted data
        let mut result = nonce.to_vec();
        result.extend_from_slice(&encrypted_data);
        Ok(result)
    }

    pub async fn decrypt(&self, data: &[u8]) -> Result<Vec<u8>, ErrorCategory> {
        let key = self.get_key().await?;
        let cipher = Aes256Gcm::new_from_slice(&key).map_err(|e| ErrorCategory::Encryption {
            message: e.to_string(),
            subcategory: Some(EncryptionSubcategory::InvalidKey),
            code: 14001,
            severity: ErrorSeverity::Error,
        })?;

        let nonce = Nonce::from_slice(&data[..12]);
        cipher
            .decrypt(nonce, &data[12..])
            .map_err(|e| ErrorCategory::Encryption {
                message: e.to_string(),
                subcategory: Some(EncryptionSubcategory::DecryptionFailed),
                code: 14005,
                severity: ErrorSeverity::Error,
            })
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_encryption_decryption() {
        let service = EncryptionService::new();
        let key = vec![0u8; 32];
        service.initialize_key(key).await;

        let data = b"Hello, World!";
        let encrypted = service.encrypt(data).await.unwrap();
        let decrypted = service.decrypt(&encrypted).await.unwrap();

        assert_eq!(data, &decrypted[..]);
    }
} 