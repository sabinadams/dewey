import { useEffect, useRef, useMemo, useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useAuth as useAuthStore } from './useAuth';

// Public routes that don't require authentication
export const publicRoutes = ['/auth'];

export function useAuthGuard() {
  const { isSignedIn } = useAuth();
  const { isLoaded, user: clerkUser } = useUser();
  const { updateUser } = useAuthStore();
  const prevUserRef = useRef<string | null>(null);
  const [stableAuthState, setStableAuthState] = useState<{ isLoading: boolean; isAuthenticated: boolean }>({
    isLoading: true,
    isAuthenticated: false
  });
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Handle user data sync
  useEffect(() => {
    if (!isLoaded) return;

    const currentUserJson = clerkUser ? JSON.stringify({
      id: clerkUser.id,
      email: clerkUser.emailAddresses[0]?.emailAddress || '',
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      imageUrl: clerkUser.imageUrl,
    }) : null;

    // Only update if the user data has actually changed
    if (currentUserJson !== prevUserRef.current) {
      console.log('User data changed:', {
        isSignedIn,
        isLoaded,
        prevUser: prevUserRef.current,
        currentUser: currentUserJson
      });
      prevUserRef.current = currentUserJson;
      updateUser(currentUserJson ? JSON.parse(currentUserJson) : null);
    }
  }, [clerkUser, isLoaded, updateUser, isSignedIn]);

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