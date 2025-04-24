import { useCallback } from 'react';
import { parseError, showErrorToast, AppError } from '@/lib/errors';

export function useErrorHandler() {
  const handleErrorWithToast = useCallback((error: any) => {
    const appError = parseError(error);
    showErrorToast(appError);
    return appError;
  }, []);

  const handleErrorSilently = useCallback((error: any): AppError => {
    return parseError(error);
  }, []);

  const handleErrorWithAction = useCallback((error: any, action: () => void) => {
    const appError = parseError(error);
    showErrorToast({
      ...appError,
      details: {
        ...appError.details,
        action
      }
    });
    return appError;
  }, []);

  return {
    handleErrorWithToast,
    handleErrorSilently,
    handleErrorWithAction
  };
} 