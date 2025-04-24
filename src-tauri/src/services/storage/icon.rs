use std::path::PathBuf;
use std::fs;
use hex;
use identicon_rs::Identicon;
use crate::error::{AppError, ErrorSeverity};
use crate::error::categories::{IconSubcategory, ErrorCategory};
use crate::types::AppResult;
use crate::constants;
use crate::utils;
use super::LocalStorage;
use base64::{Engine, engine::general_purpose::STANDARD};

/// Generates and manages project icons using identicons
pub struct IconGenerator {
    icons_dir: PathBuf,
}

impl IconGenerator {
    /// Creates a new IconGenerator
    ///
    /// # Errors
    /// Returns an error if the icons directory cannot be created
    pub fn new() -> AppResult<Self> {
        let icons_dir = LocalStorage::get_app_dir().join(constants::files::ICONS_DIR);
        utils::ensure_dir_exists(&icons_dir)?;
        
        Ok(Self { icons_dir })
    }

    /// Generates an icon from the provided seed and saves it to disk
    /// Returns the filename of the saved icon
    ///
    /// # Errors
    /// Returns an error if:
    /// - The file path is invalid
    /// - The identicon fails to generate or save
    pub fn generate_and_save(&self, seed: &[u8]) -> AppResult<String> {
        // Create a filename from the first few bytes of the seed
        let truncated_seed = &seed[..std::cmp::min(seed.len(), 8)];
        let filename = format!("icon_{}.png", hex::encode(truncated_seed));
        let file_path = self.icons_dir.join(&filename);
        
        // Convert seed to hex string for the identicon generator
        let hex_seed = hex::encode(seed);
        
        // Generate and save the identicon
        let path_str = file_path.to_str()
            .ok_or_else(|| AppError::new(
                constants::errors::INVALID_FILE_PATH,
                ErrorCategory::Icon(IconSubcategory::InvalidPath),
                ErrorSeverity::Error,
            ))?;
            
        Identicon::new(&hex_seed)
            .set_border(0)
            .save_image(path_str)
            .map_err(|e| AppError::new(
                e.to_string(),
                ErrorCategory::Icon(IconSubcategory::GenerationFailed),
                ErrorSeverity::Error,
            ))?;
        
        Ok(filename)
    }
    
    /// Save a custom icon from base64 image data
    ///
    /// # Arguments
    /// * `base64_data` - The base64 encoded image data
    /// * `name` - The project name (used for creating a unique file name)
    /// * `user_id` - The user ID (used for creating a unique file name)
    ///
    /// # Returns
    /// The filename of the saved icon
    ///
    /// # Errors
    /// Returns an error if:
    /// - The base64 data is invalid
    /// - The file could not be written
    pub fn save_custom_icon(&self, base64_data: &str, name: &str, user_id: &str) -> AppResult<String> {
        // Generate a unique filename for the custom icon
        let hash = blake3::hash(utils::generate_unique_hash(&[name, user_id, "custom"]).as_bytes());
        
        // Determine file extension from image data
        let file_ext = if base64_data.starts_with("data:image/png;") {
            "png"
        } else if base64_data.starts_with("data:image/jpeg;") {
            "jpg"
        } else if base64_data.starts_with("data:image/svg+xml;") {
            "svg"
        } else {
            "png" // Default to png
        };
        
        // Create the filename and path
        let icon_name = format!("{}.{}", hex::encode(&hash.as_bytes()[..8]), file_ext);
        let icon_path = self.icons_dir.join(&icon_name);
        
        // Decode the base64 image data
        let image_data = STANDARD.decode(
            base64_data
                .replace("data:image/png;base64,", "")
                .replace("data:image/jpeg;base64,", "")
                .replace("data:image/svg+xml;base64,", "")
        ).map_err(|e| AppError::new(
            e.to_string(),
            ErrorCategory::Icon(IconSubcategory::Base64DecodeFailed),
            ErrorSeverity::Error,
        ))?;
        
        // Write the image to the file
        fs::write(&icon_path, &image_data)?;
        
        Ok(icon_name)
    }

    /// Returns the directory where icons are stored
    #[must_use]
    pub const fn get_icons_dir(&self) -> &PathBuf {
        &self.icons_dir
    }
    
    /// Returns the full path to an icon given its filename
    #[must_use]
    pub fn get_icon_path(&self, filename: &str) -> PathBuf {
        self.icons_dir.join(filename)
    }
} 