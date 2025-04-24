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
└── conversions.rs   # Error conversions and implementations
```

### Core Components

1. **Error Types (`types.rs`)**
   - `ErrorSeverity`: Defines error severity levels (Info, Warning, Error, Critical)
   - `AppError`: The main error type containing message, category, and severity
   - `AppResult<T>`: Type alias for `Result<T, AppError>`

2. **Error Categories (`categories.rs`)**
   - Contains all error categories and their subcategories
   - Each category is an enum variant of `ErrorCategory`
   - Subcategories provide detailed error classification

3. **Error Conversions (`conversions.rs`)**
   - Implements conversions from external error types
   - Handles error display formatting
   - Provides trait implementations for error handling

### Creating and Using Errors

1. **Basic Error Creation**
   ```rust
   use crate::error::{AppError, ErrorSeverity};
   use crate::error::categories::{ErrorCategory, DatabaseSubcategory};

   // Create an error with category and subcategory
   let error = AppError::new(
       "Failed to connect to database".to_string(),
       ErrorCategory::Database(DatabaseSubcategory::ConnectionFailed),
       ErrorSeverity::Error
   );
   ```

2. **Adding New Error Types**
   To add a new error type:
   
   1. Add a new subcategory in `categories.rs`:
   ```rust
   #[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
   pub enum NewFeatureSubcategory {
       OperationFailed,
       InvalidInput,
       // Add more subcategories as needed
   }
   ```

   2. Add the category to `ErrorCategory`:
   ```rust
   #[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
   pub enum ErrorCategory {
       // ... existing categories ...
       NewFeature(NewFeatureSubcategory),
   }
   ```

   3. Use the new error type:
   ```rust
   AppError::new(
       "Operation failed".to_string(),
       ErrorCategory::NewFeature(NewFeatureSubcategory::OperationFailed),
       ErrorSeverity::Error
   )
   ```

### Error Categories and Subcategories

The system supports the following error categories, each with specific subcategories:

| Category | Description | Example Use Case | Common Subcategories |
|----------|-------------|------------------|----------------------|
| Database | Database-related errors | SQL query failures | `ConnectionFailed`, `QueryFailed`, `TransactionFailed` |
| Migration | Database migration errors | Failed schema updates | `VersionConflict`, `SchemaError`, `DataError` |
| Io | File system and I/O errors | File read/write failures | `ReadFailed`, `WriteFailed`, `PermissionDenied` |
| Config | Configuration errors | Invalid settings | `ParseError`, `ValidationError`, `MissingRequired` |
| Icon | Icon-related errors | Failed icon operations | `GenerationFailed`, `SaveFailed`, `InvalidFormat` |
| Keyring | Keyring-related errors | Failed key storage | `AccessDenied`, `KeyNotFound`, `KeyringUnavailable` |
| Project | Project-related errors | Invalid project data | `NotFound`, `InvalidName`, `InvalidPath` |
| Encryption | Encryption-related errors | Failed encryption/decryption | `DecryptionFailed`, `EncryptionFailed`, `InvalidKey` |
| Connection | Connection errors | Network failures | `ConnectionFailed`, `Timeout`, `Refused` |
| Validation | Input validation errors | Invalid user input | `InvalidFormat`, `MissingRequired`, `InvalidRange` |
| Auth | Authentication errors | Failed login | `InvalidCredentials`, `TokenExpired`, `AccountLocked` |
| Unknown | Unknown or unexpected errors | Unhandled exceptions | `Unexpected`, `System`, `External` |

### Error Severity Levels

The system defines four severity levels for errors:

| Severity | Description | Example Use Case |
|----------|-------------|------------------|
| Info | Informational messages | Operation completed with notes |
| Warning | Potential issues | Non-critical problems |
| Error | Problems needing attention | Failed operations |
| Critical | Serious problems | Data corruption, security issues |

### Best Practices

1. **Error Creation**
   - Use `AppError::new()` to create errors directly
   - Include descriptive error messages
   - Set appropriate severity levels
   - Example:
   ```rust
   AppError::new(
       "Failed to execute query: table does not exist".to_string(),
       ErrorCategory::Database(DatabaseSubcategory::QueryFailed),
       ErrorSeverity::Error
   )
   ```

2. **Error Handling**
   - Use `AppResult<T>` for functions that can fail
   - Convert external errors using `From` implementations
   - Handle errors at the appropriate level
   - Example:
   ```rust
   fn process_data() -> AppResult<Data> {
       let file = read_file("data.json")
           .map_err(|e| AppError::from(e))?;
       // Process file...
   }
   ```

3. **Error Conversion**
   - Use the provided `From` implementations for common error types
   - Implement custom conversions when needed
   - Example:
   ```rust
   impl From<sqlx::Error> for AppError {
       fn from(error: sqlx::Error) -> Self {
           AppError::new(
               error.to_string(),
               ErrorCategory::Database(DatabaseSubcategory::QueryFailed),
               ErrorSeverity::Error
           )
       }
   }
   ```
