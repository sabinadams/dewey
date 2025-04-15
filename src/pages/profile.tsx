import { UserProfile } from "@clerk/clerk-react";
import { SignedIn, SignedOut, RedirectToSignIn, useAuth } from '@clerk/clerk-react';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ProfilePage() {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <SignedIn>
        <div className="max-w-4xl mx-auto p-4">
          <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
          <UserProfile 
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "bg-transparent shadow-none",
              }
            }}
          />
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
} 