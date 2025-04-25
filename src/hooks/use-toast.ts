import { useCallback } from 'react';
import { toast } from 'sonner';

export type ToastSeverity = 'info' | 'success' | 'warning' | 'error';

interface ToastOptions {
  duration?: number;
  description?: string;
}

export function useToast() {
  const showToast = useCallback((
    message: string,
    severity: ToastSeverity = 'info',
    options: ToastOptions = {}
  ) => {
    const { duration = 3000, description } = options;
    
    switch (severity) {
      case 'success':
        toast.success(message, { duration, description });
        break;
      case 'error':
        toast.error(message, { duration, description });
        break;
      case 'warning':
        toast.warning(message, { duration, description });
        break;
      case 'info':
      default:
        toast(message, { duration, description });
        break;
    }
  }, []);

  return {
    showToast
  };
} 