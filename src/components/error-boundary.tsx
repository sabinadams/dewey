import React from 'react';
import { ErrorCategory, AppError, parseError } from '@/lib/errors';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: AppError | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any): ErrorBoundaryState {
    return {
      hasError: true,
      error: parseError(error)
    };
  }

  componentDidCatch(error: any, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const { error } = this.state;
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="text-muted-foreground mb-4">{error?.message}</p>
          {(error?.category === ErrorCategory.KEYRING || 
            error?.category === ErrorCategory.KEY_GENERATION) && (
            <button
              onClick={() => window.location.href = '/onboarding'}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Set Up Encryption Key
            </button>
          )}
        </div>
      );
    }

    return this.props.children;
  }
} 