# Tauri + React + Typescript

This template should help get you started developing with Tauri, React and Typescript in Vite.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## Onboarding Version Management

The application includes an onboarding flow that helps new users get started. The onboarding version is managed through a constant in `src-tauri/src/constants.rs`:

```rust
// Onboarding version - increment this when onboarding content changes
pub const ONBOARDING_VERSION: i32 = 1;
```

### When to Update the Version

You should increment the `ONBOARDING_VERSION` constant when:
- The onboarding flow content or steps change significantly
- New features are added that require user education
- The user experience flow is modified

### What Happens When the Version Changes

When the onboarding version is incremented:
1. All users who have previously completed onboarding will see the new onboarding flow
2. The system checks if the user's last completed onboarding version matches the current version
3. If there's a mismatch, the onboarding flow will be shown again
4. Users can complete the new onboarding flow to update their version record

This ensures that all users receive important updates to the onboarding experience, even if they've completed it before.

## Error Handling System

The application uses a comprehensive error handling system that ensures consistent error handling from backend to frontend. The error handling code is organized in the `src-tauri/src/error` directory with the following structure:

### Module Organization

```
error/
├── mod.rs           # Main module file that exports everything
├── types.rs         # Core error types and enums (ErrorSeverity, AppError)
├── categories.rs    # Error categories and subcategories
├── messages.rs      # Error message templates
└── impls.rs         # Error implementations and conversions
```

### Error Flow

1. **Backend Error Creation (Rust)**
   ```rust
   // Create a new error with subcategory
   let error = ErrorCategory::Project {
       message: "Project not found".to_string(),
       subcategory: Some(ProjectSubcategory::NotFound),
       code: 9000,
       severity: ErrorSeverity::Error,
   };
   
   // Convert to response
   let response = create_error_response(error);
   // Produces:
   // {
   //   "timestamp": "2024-04-24T12:00:00Z",
   //   "category": "PROJECT",
   //   "message": "Project error: Project not found",
   //   "code": 9000,
   //   "severity": "Error",
   //   "subcategory": "NotFound"
   // }
   ```

2. **Frontend Error Parsing (TypeScript)**
   ```typescript
   // Error is received from Tauri command
   const error = await invoke('some_command');
   
   // Error is parsed into AppError format
   const appError = parseError(error);
   // Produces:
   // {
   //   category: ErrorCategory.PROJECT,
   //   message: "Project not found",
   //   code: 9000,
   //   severity: ErrorSeverity.ERROR,
   //   subcategory: ErrorSubcategory.NOT_FOUND
   // }
   ```

3. **Error Display (TypeScript)**
   ```typescript
   // Show error toast
   showErrorToast(appError);
   // Shows appropriate toast based on error category and severity
   ```

### Error Categories and Subcategories

The system supports the following error categories, each with specific subcategories:

| Category | Description | Example Use Case | Common Subcategories |
|----------|-------------|------------------|----------------------|
| DATABASE | Database-related errors | SQL query failures | `ConnectionFailed`, `QueryFailed`, `TransactionFailed` |
| MIGRATION | Database migration errors | Failed schema updates | `VersionConflict`, `SchemaError`, `DataError` |
| IO | File system and I/O errors | File read/write failures | `ReadFailed`, `WriteFailed`, `PermissionDenied` |
| CONFIG | Configuration errors | Invalid settings | `ParseError`, `ValidationError`, `MissingRequired` |
| ICON_GENERATION | Icon generation errors | Failed icon creation | `GenerationFailed`, `SaveFailed`, `InvalidFormat` |
| IMAGE | Image processing errors | Invalid image format | `ProcessingFailed`, `InvalidFormat`, `InvalidSize` |
| FILE_NOT_FOUND | File not found errors | Missing resource files | `ResourceNotFound`, `ConfigNotFound`, `AssetNotFound` |
| KEYRING | Keyring-related errors | Failed key storage | `AccessDenied`, `KeyNotFound`, `KeyringUnavailable` |
| KEY_GENERATION | Key generation errors | Failed key creation | `GenerationFailed`, `StorageFailed`, `InvalidLength` |
| PROJECT | Project-related errors | Invalid project data | `NotFound`, `InvalidName`, `InvalidPath` |
| ICON | Icon-related errors | Invalid icon data | `GenerationFailed`, `SaveFailed`, `InvalidFormat` |
| CONNECTION | Connection errors | Network failures | `ConnectionFailed`, `Timeout`, `Refused` |
| VALIDATION | Input validation errors | Invalid user input | `InvalidFormat`, `MissingRequired`, `InvalidRange` |
| AUTH | Authentication errors | Failed login | `InvalidCredentials`, `TokenExpired`, `AccountLocked` |
| ENCRYPTION | Encryption-related errors | Failed encryption/decryption | `DecryptionFailed`, `EncryptionFailed`, `InvalidKey` |
| KEY_MANAGEMENT | Key management errors | Failed key operations | `KeyNotInitialized`, `KeyNotFound`, `KeyGenerationFailed` |

### Error Severity Levels

The system defines four severity levels for errors:

| Severity | Description | Example Use Case |
|----------|-------------|------------------|
| Info | Informational messages | Operation completed with notes |
| Warning | Potential issues | Non-critical problems |
| Error | Problems needing attention | Failed operations |
| Critical | Serious problems | Data corruption, security issues |

### Using Error Categories in Rust

```rust
use crate::error::{ErrorCategory, ErrorSeverity};
use crate::error::categories::{ProjectSubcategory, DatabaseSubcategory};

// Create a project error
let error = ErrorCategory::Project {
    message: "Project not found".to_string(),
    subcategory: Some(ProjectSubcategory::NotFound),
    code: 9000,
    severity: ErrorSeverity::Error,
};

// Create a database error
let error = ErrorCategory::Database {
    message: "Query failed".to_string(),
    subcategory: Some(DatabaseSubcategory::QueryFailed),
    code: 1000,
    severity: ErrorSeverity::Error,
};
```

### Error Message Templates

The system includes predefined error message templates in `messages.rs`:

```rust
pub struct ErrorMessages;

impl ErrorMessages {
    // Database errors
    pub const DB_CONNECTION_FAILED: &'static str = "Failed to connect to database: {reason}";
    pub const DB_QUERY_FAILED: &'static str = "Database query failed: {query}";
    // ... more templates
}
```

### Best Practices

1. **Error Creation**
   - Use specific error categories and subcategories
   - Include descriptive error messages
   - Set appropriate severity levels
   - Use error codes consistently
   - Example:
   ```rust
   ErrorCategory::Project {
       message: "Invalid project name".to_string(),
       subcategory: Some(ProjectSubcategory::InvalidName),
       code: 9000,
       severity: ErrorSeverity::Error,
   }
   ```

2. **Error Handling**
   - Handle errors at the appropriate level
   - Use error subcategories for specific handling
   - Log errors with full context
   - Convert external errors to internal error types
   - Example:
   ```rust
   match result {
       Ok(value) => Ok(value),
       Err(e) => match e {
           sqlx::Error::Database(_) => Err(ErrorCategory::Database {
               message: "Database error".to_string(),
               subcategory: Some(DatabaseSubcategory::QueryFailed),
               code: 1000,
               severity: ErrorSeverity::Error,
           }),
           _ => Err(ErrorCategory::Unknown {
               message: e.to_string(),
               subcategory: None,
               code: 9999,
               severity: ErrorSeverity::Error,
           }),
       },
   }
   ```

3. **Error Messages**
   - Use message templates when possible
   - Include relevant parameters
   - Be clear and actionable
   - Consider localization
   - Example:
   ```rust
   let message = ErrorMessages::format_message(
       ErrorMessages::DB_CONNECTION_FAILED,
       &serde_json::json!({ "reason": "Connection timeout" })
   );
   ```

4. **Error Codes**
   - Use consistent code ranges for each category
   - Document code ranges in comments
   - Reserve codes for future use
   - Example ranges:
   ```rust
   // Database errors: 1000-1999
   // Migration errors: 2000-2999
   // IO errors: 3000-3999
   // Icon generation errors: 4000-4999
   // Config errors: 5000-5999
   // Keyring errors: 7000-7999
   // Key generation errors: 8000-8999
   // Project errors: 9000-9999
   // Connection errors: 10000-10999
   // Encryption errors: 14000-14999
   // Key management errors: 15000-15999
   ```
