import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import { LoadingSpinner } from '@/components/ui';
import { useErrorHandler } from '@/hooks/use-error-handler';
import { ErrorCategory } from '@/lib/errors';

export default function AuthCallback() {
  const { handleRedirectCallback } = useClerk();
  const navigate = useNavigate();
  const { handleError } = useErrorHandler({
    defaultCategory: ErrorCategory.AUTH
  });

  useEffect(() => {
    async function handleCallback() {
      try {
        await handleRedirectCallback({
          afterSignInUrl: '/',
          afterSignUpUrl: '/'
        });
        navigate('/');
      } catch (err) {
        await handleError(err);
      }
    }
    handleCallback();
  }, [handleRedirectCallback, navigate, handleError]);

  return (
    <div className="flex-1 flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
} 