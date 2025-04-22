import { useEffect, useRef, useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';

// Public routes that don't require authentication
export const publicRoutes = ['/auth'];

export function useAuthGuard() {
  const { isSignedIn } = useAuth();
  const { isLoaded } = useUser();
  const [stableAuthState, setStableAuthState] = useState<{ isLoading: boolean; isAuthenticated: boolean }>({
    isLoading: true,
    isAuthenticated: false
  });
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Debounce auth state changes
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const newState = {
        isLoading: !isLoaded,
        isAuthenticated: !!isSignedIn
      };

      // Only update if the state has actually changed
      if (JSON.stringify(newState) !== JSON.stringify(stableAuthState)) {
        console.log('Stable auth state changed:', newState);
        setStableAuthState(newState);
      }
    }, 50);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isLoaded, isSignedIn, stableAuthState]);

  return stableAuthState;
} 