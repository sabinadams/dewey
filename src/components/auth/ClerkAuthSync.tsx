import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useAuth } from '@/hooks/useAuth';

export default function ClerkAuthSync() {
  const { user: clerkUser, isLoaded } = useUser();
  const { updateUser, updateLoading, user: currentUser } = useAuth();

  useEffect(() => {
    // Only update loading state if it's different from current state
    if (!isLoaded) {
      updateLoading(true);
      return;
    }

    // Update loading state first
    updateLoading(false);

    // If Clerk is loaded, sync the user state only if it's different
    const newUserData = clerkUser ? {
      id: clerkUser.id,
      email: clerkUser.emailAddresses[0]?.emailAddress || '',
      firstName: clerkUser.firstName || undefined,
      lastName: clerkUser.lastName || undefined,
      imageUrl: clerkUser.imageUrl || undefined,
    } : null;

    // Only update if the user data has actually changed
    const hasUserChanged = 
      (currentUser === null && newUserData !== null) ||
      (currentUser !== null && newUserData === null) ||
      (currentUser?.id !== newUserData?.id) ||
      (currentUser?.email !== newUserData?.email) ||
      (currentUser?.firstName !== newUserData?.firstName) ||
      (currentUser?.lastName !== newUserData?.lastName) ||
      (currentUser?.imageUrl !== newUserData?.imageUrl);

    if (hasUserChanged) {
      updateUser(newUserData);
    }
  }, [clerkUser, isLoaded, updateUser, updateLoading, currentUser]);

  return null;
} 