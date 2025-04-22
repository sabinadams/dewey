import { useAuth as useClerkAuth } from '@clerk/clerk-react';

export function useAuth() {
  const { isLoaded, isSignedIn, userId } = useClerkAuth();

  return {
    isLoaded,
    isSignedIn,
    userId,
    loading: !isLoaded,
    error: null
  };
} 