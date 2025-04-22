import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter, useRoutes, useLocation, useNavigate } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
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

  useEffect(() => {
    if (isLoading) return;

    // Handle authentication redirects
    if (isPublicRoute && isAuthenticated) {
      navigate('/', { replace: true });
    } else if (!isPublicRoute && !isAuthenticated) {
      dispatch(setReturnToPath(location.pathname));
      navigate('/auth?mode=signin&returnTo=' + encodeURIComponent(location.pathname), { replace: true });
    } else if (returnToPath && isAuthenticated) {
      navigate(returnToPath, { replace: true });
      dispatch(setReturnToPath(null));
    }
  }, [isAuthenticated, isLoading, location.pathname, isPublicRoute, returnToPath, navigate, dispatch]);

  // Show loading state while authentication is being determined
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Determine which layout to use based on route type and auth state
  const Layout = (!isAuthenticated || isPublicRoute) ? PublicLayout : AppLayout;
  
  return (
    <Layout>
      {element || <LoadingSpinner />}
    </Layout>
  );
}

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export default function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <div className="relative min-h-screen flex flex-col rounded-lg overflow-hidden">
          <TitleBar />
          <Suspense fallback={<LoadingSpinner />}>
            <RoutesGuard />
          </Suspense>
          <Toaster />
        </div>
      </BrowserRouter>
    </ClerkProvider>
  );
}
