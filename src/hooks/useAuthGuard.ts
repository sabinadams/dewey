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
import { fetchProjects } from '@/store/slices/projectsSlice';
import { selectAuthState, selectProjects } from '@/store/selectors';

// Public routes that don't require authentication
export const publicRoutes = ['/auth'];

export function useAuthGuard() {
  const { isLoaded: isAuthLoaded, isSignedIn } = useAuth();
  const { isLoaded: isUserLoaded, user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { returnTo, isAuthenticated, isLoading: authLoading } = useAppSelector(selectAuthState);
  const projects = useAppSelector(selectProjects);

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
        dispatch(fetchProjects(user.id));
      } else {
        dispatch(setUnauthenticated());
      }
    } else {
      dispatch(setLoading(true));
    }
  }, [isAuthLoaded, isUserLoaded, isSignedIn, user, dispatch]);

  const isPublicRoute = publicRoutes.some(route => location.pathname.startsWith(route));
  const isLoading = !isAuthLoaded || !isUserLoaded;

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated && !isPublicRoute) {
        if (!location.pathname.startsWith('/auth')) {
          dispatch(setReturnTo(location.pathname));
        }
        navigate('/auth?mode=signin', { replace: true });
      } else if (isAuthenticated && returnTo) {
        const path = returnTo;
        dispatch(setReturnTo(null));
        navigate(path, { replace: true });
      } else if (isAuthenticated && projects.length > 0 && location.pathname === '/') {
        navigate(`/project/${projects[0].id}`, { replace: true });
      }
    }
  }, [isLoading, isAuthenticated, isPublicRoute, location.pathname, returnTo, projects]);

  return {
    isLoading,
    isAuthenticated,
    isPublicRoute
  };
} 