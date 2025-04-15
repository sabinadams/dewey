import { Link } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

export default function IndexPage() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return (
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Dewey</h1>
        <p className="text-lg text-gray-600">
          Your personal knowledge management system
        </p>
        {/* Add your authenticated content here */}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-8">Welcome to Dewey</h1>
      <p className="text-lg text-gray-600 mb-8">Your personal knowledge management system</p>
      
      <div className="space-x-4">
        <Link 
          to="/auth?mode=signin"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Sign In
        </Link>
        <Link 
          to="/auth?mode=signup"
          className="inline-block px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
} 