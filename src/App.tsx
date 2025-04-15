import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter, Navigate, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import LoadingSpinner from './components/LoadingSpinner';
import { TitleBar } from './components/TitleBar';
import { useAuth } from '@clerk/clerk-react';
import { AppLayout } from './components/AppLayout';

// Public routes that don't require authentication
const publicRoutes = ['/sign-in'];

function RoutesGuard() {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  // Allow access to public routes even when not signed in
  if (publicRoutes.some(route => location.pathname.startsWith(route))) {
    return <AppLayout />;
  }

  // Redirect to sign-in if not authenticated
  if (!isSignedIn) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  // Show protected routes if authenticated
  return <AppLayout />;
}

function AppContent() {
  return (
    <div className="min-h-screen bg-zinc-900">
      <TitleBar />
      <Suspense fallback={<LoadingSpinner />}>
        <RoutesGuard />
      </Suspense>
    </div>
  );
}

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export default function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ClerkProvider>
  );
}
