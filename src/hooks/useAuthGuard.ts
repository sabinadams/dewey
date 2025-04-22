import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useGetCurrentUserQuery } from '@/store/api/auth.api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setReturnToPath } from '@/store/slices/ui.slice';

// Public routes that don't require authentication
export const publicRoutes = ['/auth'];

export function useAuthGuard() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSignedIn } = useAuth();
  const { isLoaded } = useUser();
  const returnToPath = useSelector((state: RootState) => state.ui.returnToPath);
  const { data: authState } = useGetCurrentUserQuery();

  useEffect(() => {
    // Wait for Clerk to load
    if (!isLoaded) return;

    const isPublicRoute = publicRoutes.some(route => location.pathname.startsWith(route));

    // If we're on a public route and authenticated, redirect to home
    if (isPublicRoute && isSignedIn) {
      navigate('/', { replace: true });
      return;
    }

    // If we're not on a public route and not authenticated, redirect to auth
    if (!isPublicRoute && !isSignedIn) {
      dispatch(setReturnToPath(location.pathname));
      navigate('/auth?mode=signin&returnTo=' + encodeURIComponent(location.pathname), { replace: true });
      return;
    }

    // If we're authenticated and have a return path, redirect there
    if (returnToPath && isSignedIn) {
      const path = returnToPath;
      dispatch(setReturnToPath(null));
      navigate(path, { replace: true });
    }
  }, [isSignedIn, isLoaded, location.pathname, returnToPath, navigate, dispatch]);

  return { isLoading: !isLoaded, isAuthenticated: isSignedIn, user: authState?.user };
} 