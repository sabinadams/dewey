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
use crate::error::categories::{ErrorCategory, EncryptionSubcategory, KeyringSubcategory};
use super::key_management::KeyManager;
use std::sync::Once;
use keyring;
use crate::constants::keys::{SERVICE_NAME, ACCOUNT_NAME};

static ENCRYPTION_KEY: OnceLock<Arc<[u8; 32]>> = OnceLock::new();

static INIT: Once = Once::new();
static mut TEST_DIR: Option<tempfile::TempDir> = None;

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
async fn get_encryption_key() -> AppResult<Arc<[u8; 32]>> {
    // First try to get the key from memory
    if let Some(key) = ENCRYPTION_KEY.get() {
        return Ok(Arc::clone(key));
    }

    // If not in memory, try to load it from the keyring
    let key_manager = KeyManager::new()?;
    match key_manager.get_key_from_keyring().await {
        Ok(key) => {
            let key_array: [u8; 32] = key.try_into().map_err(|_| AppError::new(
                "Invalid key length",
                ErrorCategory::Encryption(EncryptionSubcategory::InvalidKey),
                ErrorSeverity::Error
            ))?;
            
            // Store in memory for future use
            let arc_key = Arc::new(key_array);
            if ENCRYPTION_KEY.set(arc_key.clone()).is_err() {
                error!("Failed to store encryption key in memory");
            }
            
            Ok(arc_key)
        }
        Err(e) => Err(e)
    }
}

/// Encrypt a string value
pub async fn encrypt_string(value: &str) -> AppResult<String> {
    let key = get_encryption_key().await?;
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
pub async fn decrypt_string(encrypted_value: &str) -> AppResult<String> {
    let key = get_encryption_key().await?;
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
    use tempfile::tempdir;
    use crate::services::storage::LocalStorage;
    use std::sync::Once;

    static INIT: Once = Once::new();
    static mut TEST_DIR: Option<tempfile::TempDir> = None;

    async fn setup_test_env() -> KeyManager {
        unsafe {
            INIT.call_once(|| {
                let temp_dir = tempdir().unwrap();
                let app_dir = temp_dir.path().to_path_buf();
                LocalStorage::set_app_dir_for_testing(app_dir);
                TEST_DIR = Some(temp_dir);
            });
        }
        
        // Create a new key manager for each test
        KeyManager::new().unwrap()
    }

    async fn initialize_test_key() -> AppResult<()> {
        let key_manager = KeyManager::new()?;
        let key = key_manager.get_or_create_key().await?;
        
        // Ensure key is exactly 32 bytes
        if key.len() != 32 {
            return Err(AppError::new(
                "Invalid key length",
                ErrorCategory::Encryption(EncryptionSubcategory::InvalidKey),
                ErrorSeverity::Error
            ));
        }

        let key_array: [u8; 32] = key.try_into().map_err(|_| AppError::new(
            "Invalid key length",
            ErrorCategory::Encryption(EncryptionSubcategory::InvalidKey),
            ErrorSeverity::Error
        ))?;

        if ENCRYPTION_KEY.get().is_none() {
            ENCRYPTION_KEY.set(Arc::new(key_array)).map_err(|_| AppError::new(
                "Failed to set encryption key",
                ErrorCategory::Encryption(EncryptionSubcategory::KeyInitialization),
                ErrorSeverity::Error
            ))?;
        }
        Ok(())
    }

    #[tokio::test]
    async fn test_key_management() {
        let key_manager = setup_test_env().await;

        // Test key creation and storage
        let key = key_manager.get_or_create_key().await.unwrap();
        assert_eq!(key.len(), 32); // AES-256 key length

        // Test key retrieval
        let retrieved_key = key_manager.get_key_from_keyring().await.unwrap();
        assert_eq!(key, retrieved_key);

        // Test key existence check
        assert!(key_manager.has_key_in_keyring().unwrap());
    }

    #[tokio::test]
    async fn test_encryption_decryption() {
        let _key_manager = setup_test_env().await;
        
        // Initialize the key
        initialize_test_key().await.unwrap();
        
        // Test encryption and decryption
        let original = "Hello, World!";
        let encrypted = encrypt_string(original).await.unwrap();
        let decrypted = decrypt_string(&encrypted).await.unwrap();
        
        assert_eq!(original, decrypted);
        
        // Test with empty string
        let empty_encrypted = encrypt_string("").await.unwrap();
        let empty_decrypted = decrypt_string(&empty_encrypted).await.unwrap();
        assert_eq!("", empty_decrypted);
        
        // Test with special characters
        let special = "!@#$%^&*()_+{}|:\"<>?";
        let special_encrypted = encrypt_string(special).await.unwrap();
        let special_decrypted = decrypt_string(&special_encrypted).await.unwrap();
        assert_eq!(special, special_decrypted);
    }

    #[tokio::test]
    async fn test_error_handling() {
        let key_manager = setup_test_env().await;

        // Clear any existing key
        key_manager.delete_key().await.unwrap();

        // Test key not found error (before initialization)
        let result = get_encryption_key().await;
        assert!(matches!(
            result.unwrap_err().category,
            ErrorCategory::Keyring(KeyringSubcategory::KeyNotFound)
        ));

        // Test invalid encrypted data
        initialize_test_key().await.unwrap();
        let result = decrypt_string("invalid_json").await;
        assert!(matches!(
            result.unwrap_err().category,
            ErrorCategory::Encryption(EncryptionSubcategory::DeserializationFailed)
        ));
    }

    #[tokio::test]
    async fn test_concurrent_access() {
        let _key_manager = setup_test_env().await;
        
        // Initialize the key
        initialize_test_key().await.unwrap();
        
        // Test concurrent encryption/decryption
        let mut handles = vec![];
        for i in 0..10 {
            let handle = tokio::spawn(async move {
                let value = format!("test_{}", i);
                let encrypted = encrypt_string(&value).await.unwrap();
                let decrypted = decrypt_string(&encrypted).await.unwrap();
                assert_eq!(value, decrypted);
            });
            handles.push(handle);
        }
        
        for handle in handles {
            handle.await.unwrap();
        }
    }

    #[tokio::test]
    async fn test_key_persistence() {
        let key_manager = setup_test_env().await;
        
        // Create and store a key
        let key = key_manager.get_or_create_key().await.unwrap();
        
        // Create a new key manager instance (simulating app restart)
        let new_key_manager = KeyManager::new().unwrap();
        
        // Verify the key is still accessible
        let retrieved_key = new_key_manager.get_key_from_keyring().await.unwrap();
        assert_eq!(key, retrieved_key);
    }
} 