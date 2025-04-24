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

export interface AppError {
  category: ErrorCategory;
  message: string;
  details?: Record<string, any>;
  subcategory?: string | KeyringSubcategory | KeyGenerationSubcategory | ProjectSubcategory;
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
        details: error.details
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
            details: error
          };
        }
      }
    }
  }
  
  // If we can't parse the error, return it as unknown
  return {
    category: ErrorCategory.UNKNOWN,
    message: typeof error === 'string' ? error : 'An unknown error occurred',
    details: error
  };
}

function isAppError(error: any): error is AppError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'category' in error &&
    'message' in error &&
    Object.values(ErrorCategory).includes(error.category)
  );
}

export function showErrorToast(error: AppError) {
  const { category, message, subcategory } = error;
  
  switch (category) {
    case ErrorCategory.KEYRING:
    case ErrorCategory.KEY_GENERATION:
      toast.error('Encryption Key Error', {
        description: message,
        action: {
          label: 'Set Up',
          onClick: () => {
            window.location.href = '/onboarding';
          }
        }
      });
      break;
      
    case ErrorCategory.FILE_NOT_FOUND:
      toast.error('File Not Found', {
        description: message
      });
      break;
      
    case ErrorCategory.DATABASE:
    case ErrorCategory.MIGRATION:
      toast.error('Database Error', {
        description: message
      });
      break;
      
    case ErrorCategory.IO:
      toast.error('File System Error', {
        description: message
      });
      break;
      
    case ErrorCategory.CONFIG:
      toast.error('Configuration Error', {
        description: message
      });
      break;
      
    case ErrorCategory.ICON_GENERATION:
    case ErrorCategory.IMAGE:
    case ErrorCategory.ICON:
      toast.error('Image Processing Error', {
        description: message
      });
      break;

    case ErrorCategory.PROJECT:
      const title = subcategory === 'NotFound' ? 'Project Not Found' : 'Project Error';
      toast.error(title, {
        description: message
      });
      break;

    case ErrorCategory.CONNECTION:
      toast.error('Connection Error', {
        description: message
      });
      break;

    case ErrorCategory.VALIDATION:
      toast.error('Validation Error', {
        description: message
      });
      break;

    case ErrorCategory.AUTH:
      toast.error('Authentication Error', {
        description: message
      });
      break;

    case ErrorCategory.ENCRYPTION:
      toast.error('Encryption Error', {
        description: message
      });
      break;
      
    default:
      toast.error('Error', {
        description: message
      });
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