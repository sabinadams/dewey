use tauri::{
    http::{Request, Response, Uri},
    Manager,
    UriSchemeContext
};

use std::{fs, path::PathBuf};

pub fn icon_protocol<'a, R: tauri::Runtime>(
    ctx: UriSchemeContext<'a, R>,
    request: Request<Vec<u8>>
) -> Response<Vec<u8>> {    
    let uri: &Uri = request.uri();
    let binding = uri.to_string().replace("icon://", "");
    let icon_name = binding.trim_end_matches('/');
    let base_path: PathBuf = ctx.app_handle().path().app_data_dir().unwrap().join("icons");
    
    let full_path = base_path.join(&icon_name);
    
    match fs::read(&full_path) {
        Ok(data) => Response::builder()
            .header("Content-Type", "image/png")
            .header("Cache-Control", "public, max-age=31536000")
            .body(data)
            .unwrap(),
        Err(e) => {
            println!("Failed to read icon: {:?}", e);
            Response::builder()
                .status(404)
                .body(Vec::new())
                .unwrap()
        }
    }
}