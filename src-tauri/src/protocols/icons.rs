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
    let path = uri.path();

    let base_path: PathBuf = ctx.app_handle().path().app_data_dir().unwrap().join("icons");
    let full_path = base_path.join(path.trim_start_matches('/'));
    
    match fs::read(&full_path) {
        Ok(data) => Response::builder()
            .header("Content-Type", "image/png")
            .header("Cache-Control", "public, max-age=31536000")
            .body(data)
            .unwrap(),
        Err(_) => Response::builder()
            .status(404)
            .body(Vec::new())
            .unwrap()
    }
}