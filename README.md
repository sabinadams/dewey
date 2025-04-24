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

The application uses a comprehensive error handling system that ensures consistent error handling from backend to frontend. This section documents the complete flow of errors through the application.

### Error Flow

1. **Backend Error Creation (Rust)**
   ```rust
   // Create a new error
   let error = AppError::Project("Project not found".to_string());
   
   // Convert to response
   let response = create_error_response(error);
   // Produces:
   // {
   //   "category": "PROJECT",
   //   "message": "Project error: Project not found",
   //   "details": null
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
   //   details: { /* original error details */ }
   // }
   ```

3. **Error Display (TypeScript)**
   ```typescript
   // Show error toast
   showErrorToast(appError);
   // Shows appropriate toast based on error category
   ```

### Error Categories

The system supports the following error categories, each of which may have optional subcategories for more granular error handling:

| Category | Description | Example Use Case | Common Subcategories |
|----------|-------------|------------------|----------------------|
| DATABASE | Database-related errors | SQL query failures | `CONNECTION`, `QUERY`, `TRANSACTION` |
| MIGRATION | Database migration errors | Failed schema updates | `VERSION`, `SCHEMA`, `DATA` |
| IO | File system and I/O errors | File read/write failures | `READ`, `WRITE`, `PERMISSION` |
| CONFIG | Configuration errors | Invalid settings | `PARSE`, `VALIDATION`, `MISSING` |
| ICON_GENERATION | Icon generation errors | Failed icon creation | `FORMAT`, `SIZE`, `PROCESSING` |
| IMAGE | Image processing errors | Invalid image format | `FORMAT`, `SIZE`, `PROCESSING` |
| FILE_NOT_FOUND | File not found errors | Missing resource files | `RESOURCE`, `CONFIG`, `ASSET` |
| KEYRING | Keyring-related errors | Failed key storage | `ACCESS`, `STORAGE`, `LOCKED` |
| KEY_GENERATION | Key generation errors | Failed key creation | `ALGORITHM`, `LENGTH`, `ENTROPY` |
| PROJECT | Project-related errors | Invalid project data | `NOT_FOUND`, `INVALID`, `CONFLICT` |
| ICON | Icon-related errors | Invalid icon data | `FORMAT`, `SIZE`, `METADATA` |
| CONNECTION | Connection errors | Network failures | `TIMEOUT`, `REFUSED`, `RESET` |
| VALIDATION | Input validation errors | Invalid user input | `FORMAT`, `REQUIRED`, `RANGE` |
| AUTH | Authentication errors | Failed login | `CREDENTIALS`, `EXPIRED`, `LOCKED` |
| UNKNOWN | Unknown errors | Unhandled exceptions | `UNEXPECTED`, `SYSTEM`, `EXTERNAL` |

### Error Handling Components

1. **Backend (Rust)**
   - `AppError` enum: Defines all possible error types with optional subcategories
   - `ErrorCategory` trait: Provides consistent error categorization
   - `create_error_response`: Converts errors to JSON format with subcategory support
   - `ErrorSubcategory` enum: Defines available subcategories for each error type

2. **Frontend (TypeScript)**
   - `ErrorCategory` enum: Matches backend error categories
   - `ErrorSubcategory` enum: Matches backend error subcategories
   - `AppError` interface: Defines error structure with optional subcategory
   - `parseError`: Converts raw errors to AppError format
   - `showErrorToast`: Displays error messages to users
   - `ErrorBoundary`: Catches and displays React errors
   - `useErrorHandler`: Hook for handling errors in components

### Using the Error Handler Hook with Subcategories

```typescript
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { ErrorCategory, ErrorSubcategory } from '@/types/errors';

function MyComponent() {
  const { handleErrorWithToast, handleErrorSilently, handleErrorWithAction } = useErrorHandler();

  const handleClick = async () => {
    try {
      // Some operation that might fail
    } catch (error) {
      // Show error with toast
      handleErrorWithToast(error);
      
      // Or handle silently
      const appError = handleErrorSilently(error);
      
      // Or handle with custom action based on subcategory
      handleErrorWithAction(error, (error) => {
        if (error.category === ErrorCategory.KEYRING && 
            error.subcategory === ErrorSubcategory.ACCESS) {
          // Prompt user for keychain access
          promptForKeychainAccess();
        } else {
          // Default error handling
          showErrorToast(error);
        }
      });
    }
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

### Error Boundary Usage

```typescript
import { ErrorBoundary } from '@/components/error-boundary';

function App() {
  return (
    <ErrorBoundary>
      <MyApp />
    </ErrorBoundary>
  );
}
```

### Best Practices

1. **Backend Error Creation**
   - Use specific error variants when possible
   - Include descriptive error messages
   - Add relevant details when available
   - Use subcategories to provide more context about the error
   - Example:
   ```rust
   AppError::Keyring {
       message: "Failed to access keychain".to_string(),
       subcategory: Some(ErrorSubcategory::ACCESS),
       details: None
   }
   ```

2. **Frontend Error Handling**
   - Always use the error handler hook
   - Handle errors at the appropriate level
   - Provide user-friendly error messages
   - Log errors for debugging
   - Use subcategories to implement specific error handling logic
   - Example:
   ```typescript
   if (error.category === ErrorCategory.KEYRING) {
     switch (error.subcategory) {
       case ErrorSubcategory.ACCESS:
         // Handle keychain access error
         break;
       case ErrorSubcategory.STORAGE:
         // Handle storage error
         break;
       default:
         // Handle other keyring errors
     }
   }
   ```

3. **Error Categories and Subcategories**
   - Use the most specific category and subcategory possible
   - Add new categories and subcategories when needed
   - Document new categories and subcategories in this README
   - Keep subcategories consistent within each category

4. **Error Messages**
   - Be clear and concise
   - Include actionable information
   - Avoid technical jargon
   - Consider localization
   - Include subcategory-specific guidance when relevant

### Example Error Flow

1. **Backend Error Occurs**
   ```rust
   fn get_project(id: &str) -> Result<Project, AppError> {
       let project = db::get_project(id)?;
       if project.is_none() {
           return Err(AppError::Project("Project not found".to_string()));
       }
       Ok(project.unwrap())
   }
   ```

2. **Frontend Receives Error**
   ```typescript
   const { handleErrorWithToast } = useErrorHandler();
   
   const loadProject = async (id: string) => {
     try {
       const project = await invoke('get_project', { id });
       // Handle success
     } catch (error) {
       handleErrorWithToast(error);
       // Error toast is shown to user
     }
   };
   ```

3. **User Sees Error**
   - Toast appears with error message
   - Error is logged to console
   - User can take appropriate action

This error handling system ensures consistent error handling throughout the application while providing a good user experience.
