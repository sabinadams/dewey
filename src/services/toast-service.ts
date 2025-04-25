import { toast } from 'sonner';
import { AppError, ErrorCategory, ErrorSeverity } from '@/lib/errors';

function getToastTitle(category: ErrorCategory, subcategory?: string): string {
  if (subcategory) {
    return `${category} Error: ${subcategory}`;
  }
  return `${category} Error`;
}

function getToastDuration(severity: ErrorSeverity): number {
  switch (severity) {
    case ErrorSeverity.Critical:
      return 10000; // 10 seconds
    case ErrorSeverity.Error:
      return 5000;  // 5 seconds
    case ErrorSeverity.Warning:
      return 3000;  // 3 seconds
    case ErrorSeverity.Info:
      return 2000;  // 2 seconds
    default:
      return 5000;
  }
}

function getToastAction(error: AppError) {
  if (error.severity === ErrorSeverity.Critical) {
    return {
      label: 'Contact Support',
      onClick: () => {
        // Implement support contact logic
        console.log('Support contact clicked');
      }
    };
  }
  return undefined;
}

export class ToastService {
  private static instance: ToastService;
  private errorQueue: AppError[] = [];
  private isProcessingQueue = false;

  private constructor() {}

  static getInstance(): ToastService {
    if (!ToastService.instance) {
      ToastService.instance = new ToastService();
    }
    return ToastService.instance;
  }

  private async processQueue() {
    if (this.isProcessingQueue || this.errorQueue.length === 0) return;

    this.isProcessingQueue = true;
    try {
      const error = this.errorQueue.shift();
      if (error) {
        await this.showError(error);
      }
    } finally {
      this.isProcessingQueue = false;
      if (this.errorQueue.length > 0) {
        setTimeout(() => this.processQueue(), 1000);
      }
    }
  }

  private async showError(error: AppError) {
    const { category, message, severity, subcategory } = error;
    
    const toastConfig = {
      description: message,
      duration: getToastDuration(severity),
      action: getToastAction(error)
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

  async show(error: AppError) {
    this.errorQueue.push(error);
    await this.processQueue();
  }

  clear() {
    toast.dismiss();
    this.errorQueue = [];
  }
}

export const toastService = ToastService.getInstance(); 