import { toast } from 'sonner';

// Error categories from the backend
export enum ErrorCategory {
  DATABASE = 'DATABASE',
  MIGRATION = 'MIGRATION',
  IO = 'IO',
  CONFIG = 'CONFIG',
  ICON_GENERATION = 'ICON_GENERATION',
  IMAGE = 'IMAGE',
  FILE_NOT_FOUND = 'FILE_NOT_FOUND',
  UNKNOWN = 'UNKNOWN',
  KEYRING = 'KEYRING',
  KEY_GENERATION = 'KEY_GENERATION',
  PROJECT = 'PROJECT',
  ICON = 'ICON',
  CONNECTION = 'CONNECTION',
  VALIDATION = 'VALIDATION',
  AUTH = 'AUTH',
  ENCRYPTION = 'ENCRYPTION'
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
}

// Error patterns to match against backend error messages
const ERROR_PATTERNS: Record<ErrorCategory, RegExp> = {
  [ErrorCategory.DATABASE]: /Database error:/,
  [ErrorCategory.MIGRATION]: /Migration error:/,
  [ErrorCategory.IO]: /IO error:/,
  [ErrorCategory.CONFIG]: /Configuration error:/,
  [ErrorCategory.ICON_GENERATION]: /Icon generation error:/,
  [ErrorCategory.IMAGE]: /Image error:/,
  [ErrorCategory.FILE_NOT_FOUND]: /File not found:/,
  [ErrorCategory.KEYRING]: /Keyring error:/,
  [ErrorCategory.KEY_GENERATION]: /Key generation error:/,
  [ErrorCategory.PROJECT]: /Project error:/,
  [ErrorCategory.ICON]: /Icon error:/,
  [ErrorCategory.CONNECTION]: /Connection error:/,
  [ErrorCategory.VALIDATION]: /Validation error:/,
  [ErrorCategory.AUTH]: /Authentication error:/,
  [ErrorCategory.ENCRYPTION]: /Encryption error:/,
  [ErrorCategory.UNKNOWN]: /.*/ // Catch-all for unknown errors
};

export function parseError(error: any): AppError {
  // If it's already an AppError, return it
  if (isAppError(error)) {
    return error;
  }

  // Handle Tauri errors
  if (typeof error === 'object' && error !== null) {
    // Check if it's a Tauri error with category and message
    if ('category' in error && 'message' in error) {
      return {
        category: error.category as ErrorCategory,
        message: error.message,
        severity: error.severity || ErrorSeverity.Error,
        subcategory: error.subcategory
      };
    }

    // Handle Tauri errors with error field
    if ('error' in error) {
      const errorMessage = (error as { error: string }).error;
      
      // Try to match the error message against our patterns
      for (const [category, pattern] of Object.entries(ERROR_PATTERNS)) {
        if (pattern.test(errorMessage)) {
          return {
            category: category as ErrorCategory,
            message: errorMessage.replace(pattern, '').trim(),
            severity: ErrorSeverity.Error,
            subcategory: error.subcategory
          };
        }
      }
    }
  }
  
  // If we can't parse the error, return it as unknown
  return {
    category: ErrorCategory.UNKNOWN,
    message: typeof error === 'string' ? error : 'An unknown error occurred',
    severity: ErrorSeverity.Error
  };
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
    action: category === ErrorCategory.KEYRING || category === ErrorCategory.KEY_GENERATION ? {
      label: 'Set Up',
      onClick: () => {
        window.location.href = '/onboarding';
      }
    } : undefined
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

// Helper function to handle Tauri command errors
export async function handleTauriCommand<T>(
  command: () => Promise<T>
): Promise<T> {
  try {
    return await command();
  } catch (error) {
    const appError = parseError(error);
    showErrorToast(appError);
    throw appError;
  }
} 