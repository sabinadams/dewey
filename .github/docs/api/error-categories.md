# Error Categories Reference

This document outlines the error categorization system used in Dewey.

## Overview

Errors in Dewey are categorized using the `ErrorCategory` enum, which defines the source or type of error. Each category may have associated subcategories for more specific error types.

## Error Categories

### Database Errors
- **Category**: `DATABASE`
- **Description**: Errors related to database operations
- **Common Use Cases**:
  - Failed database queries
  - Connection issues
  - Transaction failures
  - Migration problems

### Migration Errors
- **Category**: `MIGRATION`
- **Description**: Errors during database migrations
- **Common Use Cases**:
  - Failed schema updates
  - Data migration failures
  - Version conflicts

### I/O Errors
- **Category**: `IO`
- **Description**: File system and I/O operation errors
- **Common Use Cases**:
  - File not found
  - Permission denied
  - Read/write failures
  - Path resolution issues

### Configuration Errors
- **Category**: `CONFIG`
- **Description**: Configuration-related errors
- **Common Use Cases**:
  - Invalid configuration values
  - Missing configuration
  - Configuration parsing errors

### Icon Generation Errors
- **Category**: `ICON_GENERATION`
- **Description**: Errors during icon generation
- **Common Use Cases**:
  - Image processing failures
  - Format conversion errors
  - Size adjustment issues

### Image Errors
- **Category**: `IMAGE`
- **Description**: General image processing errors
- **Common Use Cases**:
  - Invalid image format
  - Corrupted image data
  - Processing failures

### File Not Found Errors
- **Category**: `FILE_NOT_FOUND`
- **Description**: Specific file not found errors
- **Common Use Cases**:
  - Missing project files
  - Missing configuration files
  - Missing resource files

### Unknown Errors
- **Category**: `UNKNOWN`
- **Description**: Unclassified or unexpected errors
- **Common Use Cases**:
  - Unhandled exceptions
  - Third-party library errors
  - Unexpected system states

### Keyring Errors
- **Category**: `KEYRING`
- **Description**: Encryption key management errors
- **Common Use Cases**:
  - Key not found
  - Key access denied
  - Key storage failures

### Key Generation Errors
- **Category**: `KEY_GENERATION`
- **Description**: Errors during key generation
- **Common Use Cases**:
  - Generation failures
  - Invalid parameters
  - Resource constraints

### Project Errors
- **Category**: `PROJECT`
- **Description**: Project-related errors
- **Common Use Cases**:
  - Project not found
  - Invalid project name
  - Invalid project path
  - Project access issues

### Icon Errors
- **Category**: `ICON`
- **Description**: Icon-related errors
- **Common Use Cases**:
  - Invalid icon format
  - Icon processing failures
  - Icon storage issues

### Connection Errors
- **Category**: `CONNECTION`
- **Description**: Connection-related errors
- **Common Use Cases**:
  - Connection failures
  - Timeout errors
  - Protocol errors

### Validation Errors
- **Category**: `VALIDATION`
- **Description**: Input validation errors
- **Common Use Cases**:
  - Invalid input format
  - Missing required fields
  - Value range violations
  - Business rule violations

### Authentication Errors
- **Category**: `AUTH`
- **Description**: Authentication and authorization errors
- **Common Use Cases**:
  - Invalid credentials
  - Session expired
  - Permission denied
  - Authentication service failures

### Encryption Errors
- **Category**: `ENCRYPTION`
- **Description**: Encryption and decryption errors
- **Common Use Cases**:
  - Encryption failures
  - Decryption failures
  - Key management issues
  - Algorithm errors

## Category Selection Guidelines

When selecting an error category:

1. Choose the most specific category that matches the error's source
2. Use subcategories when available for more precise error identification
3. Default to `UNKNOWN` only when no other category fits
4. Consider the error's impact when selecting severity

## Related Documentation

- [Error Types Reference](error-types.md)
- [Error Severity Reference](error-severity.md)
- [Error Handling Guide](../core-concepts/error-handling.md) 