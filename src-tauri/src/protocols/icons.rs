use tauri::{
    http::{Request, Response, Uri},
    Manager,
    UriSchemeContext
};

use std::fs;
use std::path::Path;
use tracing::{debug, error};
use urlencoding::decode;
use crate::constants;
use crate::utils;

/// Handle custom icon URI requests to serve project icons
/// 
/// This protocol handler serves icon images from the app's data directory
/// using a custom `icon://` protocol
pub fn icon_protocol<R: tauri::Runtime>(
    ctx: UriSchemeContext<'_, R>,
    request: Request<Vec<u8>>
) -> Response<Vec<u8>> {    
    let uri: &Uri = request.uri();
    let icon_uri = uri.to_string().replace("icon://", "");
    
    // URL decode the icon name in case it contains special characters
    let icon_name = match decode(&icon_uri) {
        Ok(decoded) => decoded.trim_end_matches('/').to_string(),
        Err(e) => {
            error!("Failed to decode icon URI '{}': {}", icon_uri, e);
            return utils::response_not_found();
        }
    };
    
    debug!("Serving icon: {}", icon_name);
    
    // Get icons directory from the app data directory
    let base_path = match ctx.app_handle().path().app_data_dir() {
        Ok(path) => path.join(constants::ICONS_DIR),
        Err(e) => {
            error!("Failed to get app data directory: {}", e);
            return utils::response_not_found();
        }
    };
    
    let full_path = base_path.join(&icon_name);
    debug!("Looking for icon at path: {:?}", full_path);
    
    // Match directly instead of using map + unwrap_or_else
    match fs::read(&full_path) {
        Ok(data) => {
            debug!("Successfully served icon: {}", icon_name);
            
            // Determine content type based on file extension
            let content_type = if let Some(extension) = Path::new(&icon_name).extension() {
                match extension.to_str().unwrap_or("").to_lowercase().as_str() {
                    "svg" => constants::SVG_CONTENT_TYPE,
                    _ => constants::PNG_CONTENT_TYPE,
                }
            } else {
                constants::PNG_CONTENT_TYPE // Default to PNG if no extension
            };
            
            Response::builder()
                .header("Content-Type", content_type)
                .header("Cache-Control", constants::ICON_CACHE_CONTROL)
                .body(data)
                .unwrap_or_else(|e| {
                    error!("Failed to build response: {}", e);
                    utils::response_server_error()
                })
        },
        Err(e) => {
            error!("Failed to read icon at {:?}: {}", full_path, e);
            utils::response_not_found()
        }
    }
} 