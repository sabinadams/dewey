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

The system supports the following error categories:

| Category | Description | Example Use Case |
|----------|-------------|------------------|
| DATABASE | Database-related errors | SQL query failures |
| MIGRATION | Database migration errors | Failed schema updates |
| IO | File system and I/O errors | File read/write failures |
| CONFIG | Configuration errors | Invalid settings |
| ICON_GENERATION | Icon generation errors | Failed icon creation |
| IMAGE | Image processing errors | Invalid image format |
| FILE_NOT_FOUND | File not found errors | Missing resource files |
| KEYRING | Keyring-related errors | Failed key storage |
| KEY_GENERATION | Key generation errors | Failed key creation |
| PROJECT | Project-related errors | Invalid project data |
| ICON | Icon-related errors | Invalid icon data |
| CONNECTION | Connection errors | Network failures |
| VALIDATION | Input validation errors | Invalid user input |
| AUTH | Authentication errors | Failed login |
| UNKNOWN | Unknown errors | Unhandled exceptions |

### Error Handling Components

1. **Backend (Rust)**
   - `AppError` enum: Defines all possible error types
   - `ErrorCategory` trait: Provides consistent error categorization
   - `create_error_response`: Converts errors to JSON format

2. **Frontend (TypeScript)**
   - `ErrorCategory` enum: Matches backend error categories
   - `AppError` interface: Defines error structure
   - `parseError`: Converts raw errors to AppError format
   - `showErrorToast`: Displays error messages to users
   - `ErrorBoundary`: Catches and displays React errors
   - `useErrorHandler`: Hook for handling errors in components

### Using the Error Handler Hook

```typescript
import { useErrorHandler } from '@/hooks/useErrorHandler';

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
      
      // Or handle with custom action
      handleErrorWithAction(error, () => {
        // Custom error handling logic
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

2. **Frontend Error Handling**
   - Always use the error handler hook
   - Handle errors at the appropriate level
   - Provide user-friendly error messages
   - Log errors for debugging

3. **Error Categories**
   - Use the most specific category possible
   - Add new categories when needed
   - Document new categories in this README

4. **Error Messages**
   - Be clear and concise
   - Include actionable information
   - Avoid technical jargon
   - Consider localization

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
