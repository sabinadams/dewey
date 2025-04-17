use blockies::Ethereum;
use std::path::PathBuf;
use std::fs::{self, File};
use std::io::Write;
use hex;
use crate::error::{AppError, AppResult};
use super::LocalStorage;

pub struct IconGenerator {
    blockies: Ethereum,
    icons_dir: PathBuf,
}

impl IconGenerator {
    pub fn new() -> AppResult<Self> {
        let icons_dir = LocalStorage::get_app_dir().join("icons");
        fs::create_dir_all(&icons_dir)?;
        
        Ok(Self {
            blockies: Ethereum::default(),
            icons_dir,
        })
    }

    pub fn generate_and_save(&self, seed: &[u8]) -> AppResult<String> {
        let mut png_data = Vec::new();
        self.blockies.create_icon(&mut png_data, seed)
            .map_err(|e| AppError::Unknown(format!("{:?}", e)))?;
        
        // Create a filename from the first few bytes of the seed
        let filename = format!(
            "icon_{}.png",
            hex::encode(&seed[..std::cmp::min(seed.len(), 8)])
        );
        let file_path = self.icons_dir.join(&filename);
        
        // Create the file and write the PNG data
        let mut file = File::create(&file_path)?;
        file.write_all(&png_data)?;
        
        // Return just the filename instead of the full path
        Ok(filename)
    }

    pub fn get_icons_dir(&self) -> &PathBuf {
        &self.icons_dir
    }
}
