import { toast } from 'sonner';

// Error categories from the backend
export enum ErrorCategory {
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

export enum KeyringSubcategory {
  AccessDenied = 'AccessDenied',
  KeyNotFound = 'KeyNotFound',
  KeyringUnavailable = 'KeyringUnavailable',
  InvalidKey = 'InvalidKey',
}

export enum KeyGenerationSubcategory {
  GenerationFailed = 'GenerationFailed',
  StorageFailed = 'StorageFailed',
  InvalidKeyLength = 'InvalidKeyLength',
}

export enum ProjectSubcategory {
  NotFound = 'NotFound',
  InvalidName = 'InvalidName',
  InvalidPath = 'InvalidPath',
}

export enum ErrorSeverity {
  Info = 'Info',
  Warning = 'Warning',
  Error = 'Error',
  Critical = 'Critical'
}

export interface AppError {
  category: ErrorCategory;
  message: string;
  severity: ErrorSeverity;
  subcategory?: string;
  stack?: string;
  context?: Record<string, any>;
}

// Utility function to create an AppError
export function createError(
  message: string,
  category: ErrorCategory,
  severity: ErrorSeverity = ErrorSeverity.Error,
  subcategory?: string,
  context?: Record<string, any>
): AppError {
  return {
    message,
    category,
    severity,
    subcategory,
    context,
    stack: new Error().stack
  };
}

export function parseError(error: any): AppError {
  // If it's already an AppError, return it
  if (isAppError(error)) {
    return error;
  }

  // Handle Tauri errors
  if (typeof error === 'object' && error !== null) {
    // Handle serialized AppError
    if ('message' in error && 'category' in error && 'severity' in error) {
      return {
        category: error.category as ErrorCategory,
        message: error.message,
        severity: error.severity as ErrorSeverity,
        subcategory: error.subcategory,
        context: error.context,
        stack: error.stack
      };
    }

    // Handle Tauri custom errors
    if (error.status === 'CUSTOM_ERROR' && typeof error.error === 'string') {
      try {
        const parsedError = JSON.parse(error.error);
        if ('message' in parsedError && 'category' in parsedError && 'severity' in parsedError) {
          return {
            category: parsedError.category as ErrorCategory,
            message: parsedError.message,
            severity: parsedError.severity as ErrorSeverity,
            subcategory: parsedError.subcategory,
            context: parsedError.context,
            stack: parsedError.stack
          };
        }
      } catch (e) {
        // If parsing fails, treat it as a plain error message
        return createError(
          error.error,
          ErrorCategory.UNKNOWN,
          ErrorSeverity.Error
        );
      }
    }

    // Handle Error objects
    if (error instanceof Error) {
      return createError(
        error.message,
        ErrorCategory.UNKNOWN,
        ErrorSeverity.Error,
        undefined,
        { stack: error.stack }
      );
    }
  }
  
  // If we can't parse the error, return it as unknown
  return createError(
    typeof error === 'string' ? error : 'An unknown error occurred',
    ErrorCategory.UNKNOWN,
    ErrorSeverity.Error
  );
}

function isAppError(error: any): error is AppError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'category' in error &&
    'message' in error &&
    'severity' in error &&
    Object.values(ErrorCategory).includes(error.category) &&
    Object.values(ErrorSeverity).includes(error.severity)
  );
}

export function showErrorToast(error: AppError) {
  const { category, message, severity, subcategory } = error;
  
  const toastConfig = {
    description: message,
    duration: severity === ErrorSeverity.Critical ? 10000 : 5000,
  };

  switch (severity) {
    case ErrorSeverity.Info:
      toast.info(getToastTitle(category, subcategory), toastConfig);
      break;
    case ErrorSeverity.Warning:
      toast.warning(getToastTitle(category, subcategory), toastConfig);
      break;
    case ErrorSeverity.Error:
    case ErrorSeverity.Critical:
      toast.error(getToastTitle(category, subcategory), toastConfig);
      break;
  }
}

function getToastTitle(category: ErrorCategory, subcategory?: string): string {
  switch (category) {
    case ErrorCategory.KEYRING:
    case ErrorCategory.KEY_GENERATION:
      return 'Encryption Key Error';
    case ErrorCategory.FILE_NOT_FOUND:
      return 'File Not Found';
    case ErrorCategory.DATABASE:
    case ErrorCategory.MIGRATION:
      return 'Database Error';
    case ErrorCategory.IO:
      return 'File System Error';
    case ErrorCategory.CONFIG:
      return 'Configuration Error';
    case ErrorCategory.ICON_GENERATION:
    case ErrorCategory.IMAGE:
    case ErrorCategory.ICON:
      return 'Image Processing Error';
    case ErrorCategory.PROJECT:
      return subcategory === 'NotFound' ? 'Project Not Found' : 'Project Error';
    case ErrorCategory.CONNECTION:
      return 'Connection Error';
    case ErrorCategory.VALIDATION:
      return 'Validation Error';
    case ErrorCategory.AUTH:
      return 'Authentication Error';
    case ErrorCategory.ENCRYPTION:
      return 'Encryption Error';
    default:
      return 'Error';
  }
} 