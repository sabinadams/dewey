import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import {
  setAuthenticated,
  setUnauthenticated,
  setLoading,
  setReturnTo,
} from '@/store/slices/authSlice';
import { selectAuthState } from '@/store/selectors';
import { useGetProjectsQuery } from '@/store/api/projects.api';

// Public routes that don't require authentication
export const publicRoutes = ['/auth'];

export function useAuthGuard() {
  const { isLoaded: isAuthLoaded, isSignedIn } = useAuth();
  const { isLoaded: isUserLoaded, user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { returnTo, isAuthenticated, isLoading: authLoading } = useAppSelector(selectAuthState);

  // Prefetch projects if user is authenticated
  useGetProjectsQuery(user?.id || '', {
    skip: !user?.id,
  });

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
      } else {
        dispatch(setUnauthenticated());
      }
    } else {
      dispatch(setLoading(true));
    }
  }, [isAuthLoaded, isUserLoaded, isSignedIn, user, dispatch]);

  useEffect(() => {
    if (!isAuthenticated && !publicRoutes.some(route => location.pathname.startsWith(route))) {
      if (!location.pathname.startsWith('/auth')) {
        dispatch(setReturnTo(location.pathname));
      }
      navigate('/auth?mode=signin', { replace: true });
    } else if (returnTo && isAuthenticated) {
      const path = returnTo;
      dispatch(setReturnTo(null));
      navigate(path, { replace: true });
    }
  }, [isAuthenticated, location.pathname, returnTo, navigate, dispatch]);

  const isPublicRoute = publicRoutes.some(route => location.pathname.startsWith(route));
  const isLoading = !isAuthLoaded || !isUserLoaded;

  return {
    isLoading,
    isAuthenticated,
    isPublicRoute
  };
} 