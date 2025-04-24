use dewey_lib::error::{ErrorCategory, AppError, ErrorSeverity};
use dewey_lib::error::categories::{
    DatabaseSubcategory, IoSubcategory, ProjectSubcategory,
};
use std::io::{Error as IoError, ErrorKind as IoErrorKind};

#[test]
fn test_database_error() {
    let error = AppError::new(
        "Failed to connect to database",
        ErrorCategory::Database(DatabaseSubcategory::ConnectionFailed),
        ErrorSeverity::Error
    );
    assert_eq!(error.message, "Failed to connect to database");
    assert_eq!(error.severity, ErrorSeverity::Error);
}

#[test]
fn test_io_error() {
    let error = AppError::new(
        "File not found",
        ErrorCategory::Io(IoSubcategory::PathNotFound),
        ErrorSeverity::Error
    );
    assert_eq!(error.message, "File not found");
    assert_eq!(error.severity, ErrorSeverity::Error);
}

#[test]
fn test_project_error() {
    let error = AppError::new(
        "Project not found",
        ErrorCategory::Project(ProjectSubcategory::NotFound),
        ErrorSeverity::Error
    );
    assert_eq!(error.message, "Project not found");
    assert_eq!(error.severity, ErrorSeverity::Error);
}

#[test]
fn test_project_error_with_details() {
    let error = AppError::new(
        "Invalid project name",
        ErrorCategory::Project(ProjectSubcategory::InvalidName),
        ErrorSeverity::Error
    );
    assert_eq!(error.message, "Invalid project name");
    assert_eq!(error.severity, ErrorSeverity::Error);
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
    let io_error = IoError::new(IoErrorKind::NotFound, "File not found");
    let app_error = AppError::from(io_error);
    assert_eq!(app_error.message, "File not found");
    assert_eq!(app_error.severity, ErrorSeverity::Error);
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