import { useEffect, useRef } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useAuth as useAuthStore } from './useAuth';

// Public routes that don't require authentication
export const publicRoutes = ['/auth'];

export function useAuthGuard() {
  const { isSignedIn } = useAuth();
  const { isLoaded, user: clerkUser } = useUser();
  const { updateUser } = useAuthStore();
  const prevUserRef = useRef<string | null>(null);

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
      prevUserRef.current = currentUserJson;
      updateUser(currentUserJson ? JSON.parse(currentUserJson) : null);
    }
  }, [clerkUser, isLoaded, updateUser]);

  return {
    isLoading: !isLoaded,
    isAuthenticated: !!isSignedIn
  };
} 