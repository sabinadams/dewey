use dewey_lib::error::{ErrorCategory, AppError, ErrorSeverity};
use dewey_lib::error::{
    DatabaseSubcategory, IoSubcategory, ProjectSubcategory,
};
use std::io;

#[test]
fn test_database_error() {
    let error = AppError::database(
        "Connection failed",
        DatabaseSubcategory::ConnectionFailed,
        ErrorSeverity::Error,
    );

    assert_eq!(error.severity, ErrorSeverity::Error);
    assert!(matches!(error.category, ErrorCategory::Database(_)));
    assert!(error.message.contains("Connection failed"));
}

#[test]
fn test_io_error() {
    let error = AppError::io(
        "Permission denied",
        IoSubcategory::PermissionDenied,
        ErrorSeverity::Error,
    );

    assert_eq!(error.severity, ErrorSeverity::Error);
    assert!(matches!(error.category, ErrorCategory::Io(_)));
    assert!(error.message.contains("Permission denied"));
}

#[test]
fn test_project_error() {
    let error = AppError::project(
        "Project not found",
        ProjectSubcategory::NotFound,
        ErrorSeverity::Error,
    );

    assert_eq!(error.severity, ErrorSeverity::Error);
    assert!(matches!(error.category, ErrorCategory::Project(_)));
    assert!(error.message.contains("Project not found"));
}

#[test]
fn test_error_serialization() {
    let error = AppError::project(
        "Project not found",
        ProjectSubcategory::NotFound,
        ErrorSeverity::Error,
    );

    let serialized = serde_json::to_value(&error).unwrap();
    assert!(serialized["message"].as_str().unwrap().contains("Project not found"));
    assert_eq!(serialized["severity"], "Error");
}

#[test]
fn test_error_conversion() {
    let io_error = io::Error::new(io::ErrorKind::NotFound, "File not found");
    let error: AppError = io_error.into();
    
    assert!(matches!(error.category, ErrorCategory::Io(IoSubcategory::PathNotFound)));
    assert!(error.message.contains("File not found"));
}

#[test]
fn test_error_display() {
    let error = AppError::project(
        "Project error",
        ProjectSubcategory::NotFound,
        ErrorSeverity::Error,
    );

    let error_str = error.category.to_string();
    assert!(error_str.contains("Project error"));
    assert!(error_str.contains("NotFound"));
} 