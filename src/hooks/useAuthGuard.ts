import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useGetCurrentUserQuery, useSetUserMutation } from '@/store/api/auth.api';
import { useGetProjectsQuery } from '@/store/api/projects.api';

// Public routes that don't require authentication
export const publicRoutes = ['/auth'];

export function useAuthGuard() {
  const { isLoaded: isAuthLoaded, isSignedIn } = useAuth();
  const { isLoaded: isUserLoaded, user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [setUser] = useSetUserMutation();
  const { data: authState, isLoading: isAuthStateLoading } = useGetCurrentUserQuery();
  const isAuthenticated = authState?.isAuthenticated ?? false;
  const returnTo = authState?.returnTo;

  // Prefetch projects if user is authenticated
  useGetProjectsQuery(user?.id || '', {
    skip: !user?.id,
  });

  useEffect(() => {
    if (isAuthLoaded && isUserLoaded && isSignedIn && user) {
      setUser({
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress || '',
        name: user.fullName || user.firstName || '',
        avatar_url: user.imageUrl
      }).catch(console.error);
    }
  }, [isAuthLoaded, isUserLoaded, isSignedIn, user, setUser]);

  useEffect(() => {
    if (!isAuthenticated && !publicRoutes.some(route => location.pathname.startsWith(route))) {
      if (!location.pathname.startsWith('/auth')) {
        // Store the return path in the URL instead of Redux
        navigate('/auth?mode=signin&returnTo=' + encodeURIComponent(location.pathname), { replace: true });
      } else {
        navigate('/auth?mode=signin', { replace: true });
      }
    } else if (returnTo && isAuthenticated) {
      navigate(returnTo, { replace: true });
    }
  }, [isAuthenticated, location.pathname, returnTo, navigate]);

  const isPublicRoute = publicRoutes.some(route => location.pathname.startsWith(route));
  const isLoading = !isAuthLoaded || !isUserLoaded || isAuthStateLoading;

  return {
    isLoading,
    isAuthenticated,
    isPublicRoute
  };
} 