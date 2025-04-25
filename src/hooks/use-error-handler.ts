import { useState, useCallback } from 'react';
import { AppError, ErrorCategory, ErrorSeverity, createError, parseError, showErrorToast } from '@/lib/errors';

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
      // Parse the error if it's not already an AppError
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

      // If we're not preventing propagation, show toast and throw the error
      if (!shouldPreventPropagation) {
        showErrorToast(finalError);
        throw finalError;
      }

      return finalError;
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