use blockies::Ethereum;
use std::path::{PathBuf, Path};
use std::fs::{self, File};
use std::io::Write;
use directories::ProjectDirs;
use hex;
use crate::error::{AppError, AppResult};

pub struct IconGenerator {
    blockies: Ethereum,
    icons_dir: PathBuf,
}

impl IconGenerator {
    pub fn new() -> AppResult<Self> {
        // Get the project directories
        let project_dirs = ProjectDirs::from("com", "dewey", "dewey")
            .ok_or_else(|| AppError::Config("Failed to get project directories".into()))?;
            
        // Create the icons directory in the data directory
        let icons_dir = project_dirs.data_dir().join("icons");
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
        let file_path = self.icons_dir.join(filename);
        
        // Create the file and write the PNG data
        let mut file = File::create(&file_path)?;
        file.write_all(&png_data)?;
        
        Ok(file_path.to_string_lossy().into_owned())
    }

    pub fn get_icons_dir(&self) -> &PathBuf {
        &self.icons_dir
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_generate_and_save_icon() {
        let generator = IconGenerator::new().unwrap();
        let result = generator.generate_and_save(
            b"0x01122df2b7d1c0a6ad94589da045af3885bedbbc"
        );
        
        assert!(result.is_ok());
        if let Ok(path_str) = result {
            let path = Path::new(&path_str);
            assert!(path.exists());
            assert!(path.starts_with(generator.get_icons_dir()));
        }
    }
}
