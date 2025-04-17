use std::path::PathBuf;
use std::fs;
use hex;
use identicon_rs::Identicon;
use crate::error::{AppError, AppResult};
use super::LocalStorage;

pub struct IconGenerator {
    icons_dir: PathBuf,
}

impl IconGenerator {
    pub fn new() -> AppResult<Self> {
        let icons_dir = LocalStorage::get_app_dir().join("icons");
        fs::create_dir_all(&icons_dir)?;
        
        Ok(Self {
            icons_dir,
        })
    }

    pub fn generate_and_save(&self, seed: &[u8]) -> AppResult<String> {
        // Convert seed to hex string (always valid)
        let hex_seed = hex::encode(seed);
        
        // Create a filename from the first few bytes of the seed
        let filename = format!(
            "icon_{}.png",
            hex::encode(&seed[..std::cmp::min(seed.len(), 8)])
        );
        let file_path = self.icons_dir.join(&filename);
        
        // Chain everything in one statement
        let path_str = file_path.to_str().ok_or_else(|| AppError::Unknown("Invalid path".into()))?;
        Identicon::new(&hex_seed)
            .set_border(0)
            .save_image(path_str)
            .map_err(|e| AppError::Unknown(format!("Failed to save icon: {:?}", e)))?;
        
        // Return just the filename instead of the full path
        Ok(filename)
    }

    pub fn get_icons_dir(&self) -> &PathBuf {
        &self.icons_dir
    }
}
