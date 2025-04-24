use dewey_lib::error::{ErrorCategory, AppError, ErrorSeverity};
use dewey_lib::error_subcategories::*;
use std::io;

#[test]
fn test_database_error() {
    let error = ErrorCategory::Database {
        message: "Connection failed".to_string(),
        subcategory: Some(DatabaseSubcategory::ConnectionFailed),
        code: 1001,
        severity: ErrorSeverity::Error,
    };

    assert_eq!(error.category_name(), "DATABASE");
    assert!(error.to_string().contains("Database error:"));
    assert!(matches!(error, ErrorCategory::Database { .. }));
}

#[test]
fn test_io_error() {
    let error = ErrorCategory::Io {
        message: "Permission denied".to_string(),
        subcategory: Some(IoSubcategory::PermissionDenied),
        code: 2001,
        severity: ErrorSeverity::Error,
    };

    assert_eq!(error.category_name(), "IO");
    assert!(error.to_string().contains("IO error:"));
    assert!(matches!(error, ErrorCategory::Io { .. }));
}

#[test]
fn test_project_error() {
    let error = ErrorCategory::Project {
        message: "Project not found".to_string(),
        subcategory: Some(ProjectSubcategory::NotFound),
        code: 3001,
        severity: ErrorSeverity::Error,
    };

    assert_eq!(error.category_name(), "PROJECT");
    assert!(error.to_string().contains("Project error:"));
    assert!(matches!(error, ErrorCategory::Project { .. }));
}

#[test]
fn test_error_serialization() {
    let error = ErrorCategory::Project {
        message: "Project not found".to_string(),
        subcategory: Some(ProjectSubcategory::NotFound),
        code: 3001,
        severity: ErrorSeverity::Error,
    };

    let response = dewey_lib::error::create_error_response(error);
    assert_eq!(response["category"], "PROJECT");
    assert!(response["message"].as_str().unwrap().contains("Project error:"));
    assert_eq!(response["subcategory"], "NotFound");
}

#[test]
fn test_error_conversion() {
    let io_error = io::Error::new(io::ErrorKind::NotFound, "File not found");
    let error: AppError = io_error.into();
    
    assert!(matches!(error, ErrorCategory::Io { .. }));
    assert!(error.to_string().contains("IO error:"));
}

#[test]
fn test_error_without_subcategory() {
    let error = ErrorCategory::Project {
        message: "Project error".to_string(),
        subcategory: None,
        code: 3001,
        severity: ErrorSeverity::Error,
    };

    let response = dewey_lib::error::create_error_response(error);
    assert_eq!(response["category"], "PROJECT");
    assert!(response["message"].as_str().unwrap().contains("Project error:"));
    assert!(response["subcategory"].is_null());
} 