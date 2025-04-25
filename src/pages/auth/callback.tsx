import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import { LoadingSpinner } from '@/components/ui';

export default function AuthCallback() {
  const { handleRedirectCallback } = useClerk();
  const navigate = useNavigate();

  useEffect(() => {
    async function handleCallback() {
      try {
        await handleRedirectCallback({
          afterSignInUrl: '/',
          afterSignUpUrl: '/'
        });
        navigate('/');
      } catch (err) {
        console.error('Auth callback failed:', err);
        navigate('/auth?mode=signin');
      }
    }
    handleCallback();
  }, [handleRedirectCallback, navigate]);

  return (
    <div className="flex-1 flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
} 