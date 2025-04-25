import React from 'react';
import { AppError, ErrorCategory, ErrorSeverity, parseError, showErrorToast } from '@/lib/errors';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
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
    const parsedError = parseError(error);
    return {
      hasError: true,
      error: parsedError
    };
  }

  componentDidCatch(error: any, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    const parsedError = parseError(error);
    showErrorToast(parsedError);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { error } = this.state;
      const isCritical = error?.severity === ErrorSeverity.Critical;
      const isRecoverable = !isCritical && error?.category !== ErrorCategory.UNKNOWN;

      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <Card className="w-full max-w-md p-6">
            <h1 className="text-2xl font-bold mb-4 text-destructive">
              {isCritical ? 'Critical Error' : 'Something went wrong'}
            </h1>
            
            <div className="space-y-4">
              <p className="text-muted-foreground">
                {error?.message || 'An unexpected error occurred'}
              </p>

              {error?.category && (
                <div className="text-sm text-muted-foreground">
                  Error Type: {error.category}
                  {error.subcategory && ` (${error.subcategory})`}
                </div>
              )}

              {isRecoverable && (
                <Button 
                  onClick={this.handleRetry}
                  className="w-full"
                >
                  Try Again
                </Button>
              )}

              {!isRecoverable && (
                <p className="text-sm text-muted-foreground">
                  Please refresh the page or contact support if the problem persists.
                </p>
              )}
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
} 