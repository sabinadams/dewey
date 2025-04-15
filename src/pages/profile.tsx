import { UserProfile } from "@clerk/clerk-react";

export default function ProfilePage() {
  return (
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
  );
} 