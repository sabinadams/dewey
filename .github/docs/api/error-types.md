# Error Types Reference

This document provides a comprehensive reference of the error handling system in Dewey.

## AppError Structure

The `AppError` interface is the standard error type used throughout the application:

```typescript
interface AppError {
  message: string;           // User-friendly error message
  category: ErrorCategory;   // Error category (e.g., DATABASE, VALIDATION)
  severity: ErrorSeverity;   // Error severity (Info, Warning, Error, Critical)
  subcategory?: string;      // Optional subcategory for more specific error types
  context?: Record<string, any>; // Optional additional context
  stack?: string;            // Optional stack trace for debugging
}
```

## Error Categories

Errors are categorized based on their source or type:

### Database Errors
- **Category**: `DATABASE`
- **Description**: Database operation failures
- **Common Subcategories**:
  - `QueryFailed`: Failed database query
  - `ConnectionFailed`: Database connection error
  - `TransactionFailed`: Transaction rollback or commit failure

### Validation Errors
- **Category**: `VALIDATION`
- **Description**: Input validation failures
- **Common Subcategories**:
  - `InvalidFormat`: Input format validation failure
  - `MissingField`: Required field is missing
  - `InvalidValue`: Field value validation failure

### Authentication Errors
- **Category**: `AUTH`
- **Description**: Authentication and authorization failures
- **Common Subcategories**:
  - `InvalidCredentials`: Invalid username/password
  - `SessionExpired`: User session has expired
  - `Unauthorized`: User lacks required permissions

### File System Errors
- **Category**: `IO`
- **Description**: File system operation failures
- **Common Subcategories**:
  - `FileNotFound`: Requested file does not exist
  - `PermissionDenied`: Insufficient file permissions
  - `ReadFailed`: File read operation failed
  - `WriteFailed`: File write operation failed

### Project Errors
- **Category**: `PROJECT`
- **Description**: Project-related operation failures
- **Common Subcategories**:
  - `NotFound`: Project not found
  - `InvalidName`: Invalid project name
  - `InvalidPath`: Invalid project path

### Encryption Errors
- **Category**: `ENCRYPTION`
- **Description**: Encryption and decryption failures
- **Common Subcategories**:
  - `EncryptionFailed`: Data encryption failed
  - `DecryptionFailed`: Data decryption failed
  - `KeyNotFound`: Encryption key not found

## Error Severity Levels

Errors are assigned a severity level that determines how they are handled and displayed:

### Info
- **Level**: `Info`
- **Description**: Informational messages
- **Display**: Toast notification (2 seconds)
- **Action**: No user action required

### Warning
- **Level**: `Warning`
- **Description**: Warning messages
- **Display**: Toast notification (3 seconds)
- **Action**: User should be aware but no immediate action required

### Error
- **Level**: `Error`
- **Description**: Error messages
- **Display**: Toast notification (5 seconds)
- **Action**: User should take action to resolve

### Critical
- **Level**: `Critical`
- **Description**: Critical error messages
- **Display**: Toast notification (10 seconds) with action button
- **Action**: Immediate user action required

## Related Documentation

- [Error Categories Reference](error-categories.md)
- [Error Severity Reference](error-severity.md)
- [Error Handling Guide](../core-concepts/error-handling.md) 