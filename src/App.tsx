import { ClerkProvider, useAuth } from '@clerk/clerk-react';
import { BrowserRouter, useRoutes, Route, Navigate, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import routes from '~react-pages';
import LoadingSpinner from './components/LoadingSpinner';
import "./App.css";

// Public routes that don't require authentication
const publicRoutes = ['/', '/auth'];

function RoutesComponent() {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();
  const element = useRoutes(routes);

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  // Redirect authenticated users away from auth pages
  if (isSignedIn && location.pathname === '/auth') {
    return <Navigate to="/" replace />;
  }

  // Allow access to public routes
  if (publicRoutes.includes(location.pathname)) {
    return element;
  }

  // Redirect to auth if not authenticated
  if (!isSignedIn) {
    return <Navigate to="/auth" replace />;
  }

  // Show protected routes if authenticated
  return element;
}

function AppContent() {
  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<LoadingSpinner />}>
        <RoutesComponent />
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
