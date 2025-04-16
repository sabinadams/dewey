import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import LoadingSpinner from '@/components/LoadingSpinner';

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
        console.error('Error handling callback:', err);
        navigate('/auth?mode=signin');
      }
    }
    handleCallback();
  }, [handleRedirectCallback, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-900">
      <LoadingSpinner />
    </div>
  );
} 