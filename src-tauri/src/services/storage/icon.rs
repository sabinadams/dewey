use std::path::PathBuf;
use std::fs;
use hex;
use identicon_rs::Identicon;
use crate::error::{AppError, AppResult};
use super::LocalStorage;

/// Generates and manages project icons using identicons
pub struct IconGenerator {
    icons_dir: PathBuf,
}

impl IconGenerator {
    pub fn new() -> AppResult<Self> {
        let icons_dir = LocalStorage::get_app_dir().join("icons");
        fs::create_dir_all(&icons_dir)
            .map_err(AppError::Io)?;
        
        Ok(Self { icons_dir })
    }

    /// Generates an icon from the provided seed and saves it to disk
    /// Returns the filename of the saved icon
    pub fn generate_and_save(&self, seed: &[u8]) -> AppResult<String> {
        // Create a filename from the first few bytes of the seed
        let truncated_seed = &seed[..std::cmp::min(seed.len(), 8)];
        let filename = format!("icon_{}.png", hex::encode(truncated_seed));
        let file_path = self.icons_dir.join(&filename);
        
        // Convert seed to hex string for the identicon generator
        let hex_seed = hex::encode(seed);
        
        // Generate and save the identicon
        let path_str = file_path.to_str()
            .ok_or_else(|| AppError::IconGeneration("Invalid file path".to_string()))?;
            
        Identicon::new(&hex_seed)
            .set_border(0)
            .save_image(path_str)
            .map_err(|e| AppError::IconGeneration(format!("Failed to save icon: {}", e)))?;
        
        Ok(filename)
    }

    pub fn get_icons_dir(&self) -> &PathBuf {
        &self.icons_dir
    }
    
    /// Returns the full path to an icon given its filename
    pub fn get_icon_path(&self, filename: &str) -> PathBuf {
        self.icons_dir.join(filename)
    }
} 