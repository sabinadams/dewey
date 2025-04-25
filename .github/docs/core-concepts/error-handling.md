# Error Handling in Dewey

Dewey implements a centralized error handling system built around React hooks and standardized error objects. This approach ensures consistency in how errors are caught, processed, displayed, and logged throughout the frontend application.

## Core Concepts

1. **`AppError` Object**: All errors, whether originating from the backend (via Tauri commands) or the frontend, are parsed or converted into a standardized `AppError` object. This object contains:
    * `message`: A user-friendly error message
    * `category`: An `ErrorCategory` enum value indicating the source or type of error (e.g., `DATABASE`, `VALIDATION`, `KEYRING`)
    * `severity`: An `ErrorSeverity` enum value (`Info`, `Warning`, `Error`, `Critical`)
    * `subcategory` (optional): More specific detail within a category (e.g., `NotFound` for `PROJECT` category)
    * `context` (optional): Additional relevant data
    * `stack` (optional): Error stack trace for debugging

2. **`useErrorHandler` Hook**: This is the primary mechanism for handling errors within React components.
    * Provides a `handleError` function to process errors
    * Provides `createAndHandleError` to create and process errors from simple messages
    * Provides `clearError` to reset error state
    * Tracks error state with `error` and `isHandlingError` flags
    * Can be configured with default categories/severities and callbacks for local error handling

3. **`ToastService`**: A singleton service that manages error notifications.
    * Queues errors to prevent overwhelming the user
    * Shows appropriate toast styles based on error severity
    * Handles toast duration based on severity
    * Provides action buttons for critical errors

4. **`ErrorBoundary` Component**: A top-level component that acts as a final safety net.
    * Catches uncaught exceptions bubbling up from components
    * Displays appropriate UI based on error severity
    * Provides retry functionality for recoverable errors
    * Shows critical error messages for non-recoverable errors

## Implementation Guidelines

**Catching and Handling Errors:**

The preferred way to handle errors, especially those from asynchronous operations like Tauri commands or API calls, is using the `useErrorHandler` hook.

```typescript
import { useErrorHandler } from '@/hooks/use-error-handler';
import { ErrorCategory, ErrorSeverity } from '@/lib/errors';
import { invoke } from '@tauri-apps/api/core';

function MyComponent() {
  const { handleError, createAndHandleError, error, isHandlingError } = useErrorHandler({
    // Optional: Set default category/severity for errors handled here
    defaultCategory: ErrorCategory.UNKNOWN,
    // Optional: Handle specific errors locally without showing a global toast
    onError: (appError) => {
      if (appError.category === ErrorCategory.VALIDATION) {
        // Handle validation errors locally (e.g., update form state)
        return true; // Returning true prevents the global toast and stops propagation
      }
      return false; // Let other errors show a toast and propagate
    },
    // Optional: Handle error recovery
    onRecover: () => {
      // Reset component state after error is cleared
    }
  });

  const performAction = async () => {
    try {
      const result = await invoke('my_tauri_command', { /* args */ });
      // Handle success
      createAndHandleError('Action successful!', ErrorCategory.UNKNOWN, ErrorSeverity.Info);
    } catch (error) {
      // Let the hook parse, show toast (if not handled locally), and re-throw
      await handleError(error);
    }
  };

  const createCustomError = () => {
    // Create an error from a simple message with context
    createAndHandleError(
      'Something specific went wrong here.',
      ErrorCategory.PROJECT,
      ErrorSeverity.Warning,
      'CustomSubcategory',
      { additionalInfo: 'context data' }
    );
  };

  return (
    <div>
      {error && <div className="error-message">{error.message}</div>}
      <button onClick={performAction} disabled={isHandlingError}>
        Perform Action
      </button>
    </div>
  );
}
```

**Key Principles:**

1. **Use `useErrorHandler`:** Always use this hook in components that perform operations that might fail.
2. **Call `handleError`:** Pass caught errors to the `handleError` function from the hook. It handles parsing, displaying toasts, and re-throwing if necessary.
3. **Avoid Direct `toast` Calls for Errors:** Use `handleError` or `createAndHandleError` to ensure consistency and proper categorization.
4. **Categorize Appropriately:** When using `createAndHandleError`, provide meaningful `ErrorCategory` and `ErrorSeverity`.
5. **Local Handling via `onError`:** Use the `onError` callback in `useErrorHandler` when you need to perform specific local actions for certain errors.
6. **Clean Up Resources:** Use `finally` blocks to clean up resources and reset state after error handling.

## Error Categories & Severity

The application uses the following error categories and severities:

### Error Categories
- `DATABASE`: Database-related errors
- `MIGRATION`: Database migration errors
- `IO`: File system and I/O errors
- `CONFIG`: Configuration errors
- `ICON_GENERATION`: Icon generation errors
- `IMAGE`: Image processing errors
- `FILE_NOT_FOUND`: File not found errors
- `UNKNOWN`: Unknown or unclassified errors
- `KEYRING`: Encryption key management errors
- `KEY_GENERATION`: Key generation errors
- `PROJECT`: Project-related errors
- `ICON`: Icon-related errors
- `CONNECTION`: Connection-related errors
- `VALIDATION`: Validation errors
- `AUTH`: Authentication errors
- `ENCRYPTION`: Encryption-related errors

### Error Severity
- `Info`: Informational messages
- `Warning`: Warning messages
- `Error`: Error messages
- `Critical`: Critical error messages

## Error Response Format

All error responses follow a consistent format:

```json
{
  "category": "ERROR_CATEGORY",
  "message": "Human-readable message",
  "severity": "SEVERITY_LEVEL",
  "subcategory": "ERROR_SUBCATEGORY",
  "context": {
    // Additional error-specific context
  },
  "stack": "Error stack trace"
}
```

## Related Documentation

- [Error Types Reference](api/error-types.md)
- [Error Categories Reference](api/error-categories.md)
- [Error Severity Reference](api/error-severity.md) 