import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useAuth } from '@/hooks/useAuth';

export default function ClerkAuthSync() {
  const { user: clerkUser, isLoaded } = useUser();
  const { updateUser, updateLoading } = useAuth();

  useEffect(() => {
    // Update loading state
    updateLoading(!isLoaded);

    // If Clerk is loaded, sync the user state
    if (isLoaded) {
      if (clerkUser) {
        updateUser({
          id: clerkUser.id,
          email: clerkUser.emailAddresses[0]?.emailAddress || '',
          firstName: clerkUser.firstName || undefined,
          lastName: clerkUser.lastName || undefined,
          imageUrl: clerkUser.imageUrl || undefined,
        });
      } else {
        updateUser(null);
      }
    }
  }, [clerkUser, isLoaded, updateUser, updateLoading]);

  return null;
} 