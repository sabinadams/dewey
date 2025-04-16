import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter, Navigate, useLocation } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import LoadingSpinner from './components/LoadingSpinner';
import { TitleBar } from './components/TitleBar';
import { useAuth, useUser } from '@clerk/clerk-react';
import { AppLayout } from './components/AppLayout';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { detectOS } from './store/slices/systemSlice';
import { setAuthenticated, setUnauthenticated, setLoading, setReturnTo } from './store/slices/authSlice';
import { AuthError } from './components/AuthError';

// Public routes that don't require authentication
const publicRoutes = ['/sign-in'];

function RoutesGuard() {
  const { isLoaded: isAuthLoaded, isSignedIn } = useAuth();
  const { isLoaded: isUserLoaded, user } = useUser();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { returnTo } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (isAuthLoaded && isUserLoaded) {
      if (isSignedIn && user) {
        dispatch(setAuthenticated({
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress || undefined,
          firstName: user.firstName || undefined,
          lastName: user.lastName || undefined,
          imageUrl: user.imageUrl || undefined,
          username: user.username || undefined
        }));
        // Clear returnTo after successful auth
        if (returnTo) {
          dispatch(setReturnTo(null));
        }
      } else {
        dispatch(setUnauthenticated());
      }
    } else {
      dispatch(setLoading(true));
    }
  }, [isAuthLoaded, isUserLoaded, isSignedIn, user, dispatch, returnTo]);

  if (!isAuthLoaded || !isUserLoaded) {
    return <LoadingSpinner />;
  }

  // Allow access to public routes even when not signed in
  if (publicRoutes.some(route => location.pathname.startsWith(route))) {
    return <AppLayout />;
  }

  // Redirect to sign-in if not authenticated
  if (!isSignedIn) {
    // Store the current path to return to after auth
    if (location.pathname !== '/sign-in') {
      dispatch(setReturnTo(location.pathname));
    }
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  // If we have a returnTo path and we're authenticated, redirect there
  if (returnTo && isSignedIn) {
    const path = returnTo;
    dispatch(setReturnTo(null));
    return <Navigate to={path} replace />;
  }

  // Show protected routes if authenticated
  return <AppLayout />;
}

function AppContent() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(detectOS());
  }, [dispatch]);

  return (
    <div className="flex-1 flex flex-col">
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
        <div className="min-h-screen bg-zinc-900 flex flex-col">
          <AppContent />
          <AuthError />
        </div>
      </BrowserRouter>
    </ClerkProvider>
  );
}
