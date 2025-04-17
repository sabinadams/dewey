import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter, Navigate, useLocation, useRoutes } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { TitleBar } from '@/components/TitleBar';
import { useAuth, useUser } from '@clerk/clerk-react';
import { AppLayout } from '@/components/AppLayout';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { detectOS } from '@/store/slices/systemSlice';
import { setAuthenticated, setUnauthenticated, setLoading, setReturnTo } from '@/store/slices/authSlice';
import { fetchProjects } from '@/store/slices/projectsSlice';
import { AuthError } from '@/components/AuthError';
import routes from '~react-pages';

// Public routes that don't require authentication
const publicRoutes = ['/auth'];

function RoutesGuard() {
  const { isLoaded: isAuthLoaded, isSignedIn } = useAuth();
  const { isLoaded: isUserLoaded, user } = useUser();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { returnTo, isAuthenticated, isLoading } = useAppSelector(state => state.auth);
  const element = useRoutes(routes);

  // Handle auth state changes
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
        // Fetch projects when we determine the user is signed in
        dispatch(fetchProjects(user.id));
      } else {
        dispatch(setUnauthenticated());
      }
    } else {
      dispatch(setLoading(true));
    }
  }, [isAuthLoaded, isUserLoaded, isSignedIn, user, dispatch]);

  // Handle loading state - only for auth, not for projects
  const { items: projects, isLoading: projectsLoading } = useAppSelector(state => state.projects);
  
  // Show loading spinner for auth loading only
  if (isLoading || !isAuthLoaded || !isUserLoaded) {
    return <LoadingSpinner />;
  }

  // Allow access to public routes even when not signed in
  if (publicRoutes.some(route => location.pathname.startsWith(route))) {
    return element ?? <LoadingSpinner />;
  }

  // Redirect to sign-in if not authenticated
  if (!isAuthenticated) {
    // Store the current path to return to after auth
    if (!location.pathname.startsWith('/auth')) {
      dispatch(setReturnTo(location.pathname));
    }
    return <Navigate to="/auth?mode=signin" replace />;
  }

  // If we have a returnTo path and we're authenticated, redirect there
  if (returnTo && isAuthenticated) {
    const path = returnTo;
    dispatch(setReturnTo(null));
    return <Navigate to={path} replace />;
  }

  if ( isAuthenticated && projects.length > 0 && location.pathname === '/' ) {
    // TODO: Ideally this should be stored in a user setting as the most recently used project
    return <Navigate to={`/project/${projects[0].id}`} replace />;
  }
  
  // Show protected routes if authenticated
  return <AppLayout>{element}</AppLayout>;
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
        <div className="bg-zinc-900 relative min-h-screen flex flex-col rounded-lg overflow-hidden">
          <AppContent />
          <AuthError />
        </div>
      </BrowserRouter>
    </ClerkProvider>
  );
}
