# Error Handling System

This document describes the error handling system used throughout the application. The system provides a consistent way to handle errors from the backend to the frontend, with proper error categorization, display, and recovery options.

## Overview

The error handling system consists of several key components:

1. **Error Types and Categories** (`src/lib/errors.ts`)
2. **Error Boundary** (`src/components/error-boundary.tsx`)
3. **Error Handler Hook** (`src/hooks/use-error-handler.ts`)

## Error Types

### AppError

The main error type used throughout the application:

```typescript
interface AppError {
  category: ErrorCategory;
  message: string;
  severity: ErrorSeverity;
  subcategory?: string;
  stack?: string;
  context?: Record<string, any>;
}
```

### Error Categories

Errors are categorized to provide better context and handling:

```typescript
enum ErrorCategory {
  DATABASE = 'Database',
  MIGRATION = 'Migration',
  IO = 'IO',
  CONFIG = 'Config',
  ICON_GENERATION = 'IconGeneration',
  IMAGE = 'Image',
  FILE_NOT_FOUND = 'FileNotFound',
  UNKNOWN = 'Unknown',
  KEYRING = 'Keyring',
  KEY_GENERATION = 'KeyGeneration',
  PROJECT = 'Project',
  ICON = 'Icon',
  CONNECTION = 'Connection',
  VALIDATION = 'Validation',
  AUTH = 'Auth',
  ENCRYPTION = 'Encryption'
}
```

### Error Severity

Errors have different severity levels:

```typescript
enum ErrorSeverity {
  Info = 'Info',
  Warning = 'Warning',
  Error = 'Error',
  Critical = 'Critical'
}
```

## Error Boundary

The error boundary is a React component that catches errors anywhere in its child component tree. It provides:

- Error UI display
- Error recovery options
- Toast notifications for errors
- Proper error categorization

### Usage

```tsx
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

### Custom Fallback

You can provide a custom fallback UI:

```tsx
<ErrorBoundary fallback={<CustomErrorUI />}>
  <App />
</ErrorBoundary>
```

## Error Handler Hook

The `useErrorHandler` hook provides a convenient way to handle errors in components:

```typescript
const { handleError, clearError, createAndHandleError } = useErrorHandler({
  defaultCategory: ErrorCategory.PROJECT,
  onError: (error) => {
    // Custom error handling
  },
  onRecover: () => {
    // Recovery logic
  }
});
```

### Features

- Error state management
- Custom error handling callbacks
- Consistent error parsing and display
- Recovery options
- Error categorization

## Error Handling Patterns

### 1. Basic Error Handling

```typescript
try {
  // Your code
} catch (error) {
  const appError = parseError(error);
  showErrorToast(appError);
  throw appError; // Propagate to error boundary
}
```

### 2. Using the Error Handler Hook

```typescript
const { handleError } = useErrorHandler();

try {
  // Your code
} catch (error) {
  await handleError(error);
}
```

### 3. Handling Specific Error Cases

```typescript
const { handleError } = useErrorHandler({
  onError: (error) => {
    if (error.category === ErrorCategory.ENCRYPTION && 
        error.subcategory === KeyringSubcategory.KeyNotFound) {
      // Handle specific error case
      return;
    }
    throw error; // Propagate other errors
  }
});
```

### 4. Creating Custom Errors

```typescript
const { createAndHandleError } = useErrorHandler();

createAndHandleError(
  'Invalid input',
  ErrorCategory.VALIDATION,
  ErrorSeverity.Warning,
  'InvalidFormat'
);
```

## Error Recovery

The system provides several ways to handle error recovery:

1. **Automatic Recovery**: For non-critical errors, the error boundary provides a "Try Again" button
2. **Custom Recovery**: Use the `onRecover` callback in the error handler hook
3. **Manual Recovery**: Call `clearError` from the error handler hook

## Best Practices

1. **Use Appropriate Error Categories**
   - Choose the most specific category that matches the error
   - Use subcategories when available for more detailed error information

2. **Set Proper Error Severity**
   - Use `Critical` for errors that prevent the application from functioning
   - Use `Error` for recoverable errors that need attention
   - Use `Warning` for non-critical issues
   - Use `Info` for informational messages

3. **Handle Specific Error Cases**
   - Use the error handler hook's `onError` callback for specific error cases
   - Let other errors propagate to the error boundary

4. **Provide Recovery Options**
   - Include recovery actions in error toasts when possible
   - Use the error boundary's retry functionality for recoverable errors

5. **Error Context**
   - Include relevant context in errors when available
   - Use the `context` field to provide additional information

## Examples

### Handling API Errors

```typescript
const { handleError } = useErrorHandler({
  defaultCategory: ErrorCategory.CONNECTION
});

try {
  const response = await api.getData();
} catch (error) {
  await handleError(error);
}
```

### Form Validation Errors

```typescript
const { createAndHandleError } = useErrorHandler({
  defaultCategory: ErrorCategory.VALIDATION
});

const validateForm = () => {
  if (!isValid) {
    createAndHandleError(
      'Invalid form data',
      ErrorCategory.VALIDATION,
      ErrorSeverity.Warning
    );
  }
};
```

### File Operation Errors

```typescript
const { handleError } = useErrorHandler({
  defaultCategory: ErrorCategory.IO
});

try {
  await saveFile(file);
} catch (error) {
  await handleError(error, ErrorCategory.IO, ErrorSeverity.Error, 'WriteFailed');
}
``` 