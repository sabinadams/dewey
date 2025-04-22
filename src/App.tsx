import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter, useRoutes, useLocation, useNavigate } from 'react-router-dom';
import { Suspense, useEffect, useRef } from 'react';
import { LoadingSpinner, Toaster } from '@/components/ui';
import { TitleBar } from '@/components/navigation';
import { AppLayout } from '@/components/layouts/AppLayout';
import { useAuthGuard } from '@/hooks';
import { publicRoutes } from '@/hooks/useAuthGuard';
import routes from '~react-pages';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setReturnToPath } from '@/store/slices/ui.slice';

function RoutesGuard() {
  const { isLoading, isAuthenticated } = useAuthGuard();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const returnToPath = useSelector((state: RootState) => state.ui.returnToPath);
  const element = useRoutes(routes);
  const isPublicRoute = publicRoutes.some(route => location.pathname.startsWith(route));
  const lastPathRef = useRef(location.pathname);
  const lastAuthRef = useRef(isAuthenticated);

  useEffect(() => {
    if (isLoading) return;

    // Only handle navigation if auth state or path has changed
    if (lastPathRef.current === location.pathname && lastAuthRef.current === isAuthenticated) {
      return;
    }

    lastPathRef.current = location.pathname;
    lastAuthRef.current = isAuthenticated;

    if (isPublicRoute && isAuthenticated) {
      navigate('/', { replace: true });
      return;
    }

    if (!isPublicRoute && !isAuthenticated) {
      dispatch(setReturnToPath(location.pathname));
      navigate('/auth?mode=signin&returnTo=' + encodeURIComponent(location.pathname), { replace: true });
      return;
    }

    if (returnToPath && isAuthenticated) {
      const path = returnToPath;
      dispatch(setReturnToPath(null));
      navigate(path, { replace: true });
    }
  }, [isAuthenticated, isLoading, location.pathname, returnToPath, navigate, dispatch, isPublicRoute]);

  if (isLoading) {
    return <PublicLayout><LoadingSpinner /></PublicLayout>;
  }

  if (isPublicRoute) {
    return <PublicLayout>{element || <LoadingSpinner />}</PublicLayout>;
  }

  if (!isAuthenticated) {
    return <PublicLayout><LoadingSpinner /></PublicLayout>;
  }

  return <AppLayout>{element || <LoadingSpinner />}</AppLayout>;
}

function AppContent() {
  return (
    <>
      <TitleBar />
      <Suspense fallback={<LoadingSpinner />}>
        <RoutesGuard />
      </Suspense>
    </>
  );
}

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export default function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <div className="relative min-h-screen flex flex-col rounded-lg overflow-hidden">
          <AppContent />
          <Toaster />
        </div>
      </BrowserRouter>
    </ClerkProvider>
  );
}
