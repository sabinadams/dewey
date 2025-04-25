import { useState, useCallback } from 'react';
import { AppError, ErrorCategory, ErrorSeverity, createError, parseError, showErrorToast } from '@/lib/errors';
import { ZodError } from 'zod';

interface UseErrorHandlerOptions {
  onError?: (error: AppError) => boolean | void;
  onRecover?: () => void;
  defaultCategory?: ErrorCategory;
  defaultSeverity?: ErrorSeverity;
}

export function useErrorHandler(options: UseErrorHandlerOptions = {}) {
  const [error, setError] = useState<AppError | null>(null);
  const [isHandlingError, setIsHandlingError] = useState(false);

  const handleError = useCallback(async (
    error: any,
    category?: ErrorCategory,
    severity?: ErrorSeverity,
    subcategory?: string,
    context?: Record<string, any>
  ) => {
    setIsHandlingError(true);
    try {
      // Handle React Hook errors
      if (error instanceof Error && error.message.includes('should be used within')) {
        const appError = createError(
          error.message,
          ErrorCategory.VALIDATION,
          ErrorSeverity.Error,
          'HookUsage'
        );
        setError(appError);
        if (options.onError) {
          return options.onError(appError);
        }
        return true; // Handle hook errors locally by default
      }

      // Handle Zod validation errors
      if (error instanceof ZodError) {
        const firstError = error.errors[0];
        const appError = createError(
          firstError.message,
          ErrorCategory.VALIDATION,
          ErrorSeverity.Error,
          firstError.path.join('.')
        );
        setError(appError);
        if (options.onError) {
          return options.onError(appError);
        }
        return true; // Handle validation errors locally by default
      }

      // Parse the error if it's not already an AppError
      console.log("[handleError] Error received before parseError:", error);
      const appError = parseError(error);
      
      // Override category and severity if provided
      const finalError = {
        ...appError,
        category: category || appError.category || options.defaultCategory || ErrorCategory.UNKNOWN,
        severity: severity || appError.severity || options.defaultSeverity || ErrorSeverity.Error,
        subcategory: subcategory || appError.subcategory,
        context: { ...appError.context, ...context }
      };

      setError(finalError);
      
      // If onError returns true, we prevent propagation
      const shouldPreventPropagation = options.onError?.(finalError) === true;

      if (shouldPreventPropagation) {
        // Error was handled locally, return it without throwing
        return finalError;
      }

      // Error wasn't handled locally, show toast and throw
      console.log("Error passed to showErrorToast:", finalError);
      showErrorToast(finalError);
      throw finalError;
    } finally {
      setIsHandlingError(false);
    }
  }, [options]);

  const clearError = useCallback(() => {
    setError(null);
    if (options.onRecover) {
      options.onRecover();
    }
  }, [options]);

  const createAndHandleError = useCallback((
    message: string,
    category?: ErrorCategory,
    severity?: ErrorSeverity,
    subcategory?: string,
    context?: Record<string, any>
  ) => {
    const appError = createError(
      message,
      category || options.defaultCategory || ErrorCategory.UNKNOWN,
      severity || options.defaultSeverity || ErrorSeverity.Error,
      subcategory,
      context
    );
    return handleError(appError);
  }, [handleError, options]);

  return {
    error,
    isHandlingError,
    handleError,
    clearError,
    createAndHandleError
  };
} 