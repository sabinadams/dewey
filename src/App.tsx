import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter, useRoutes, useLocation, useNavigate } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { LoadingSpinner, Toaster, Card, ScrollArea } from '@/components/ui';
import TitleBar from '@/components/navigation/TitleBar';
import { Navigation } from '@/components/navigation';
import { useAuthGuard } from '@/hooks';
import { publicRoutes } from '@/hooks/useAuthGuard';
import routes from '~react-pages';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setReturnToPath } from '@/store/slices/ui.slice';

function SuspenseFallback() {
  return (
    <div className="absolute inset-0 bg-background">
      <div className="flex flex-1 h-screen">
        <main className="flex-1 p-2 h-full overflow-hidden flex items-center justify-center">
          <LoadingSpinner />
        </main>
      </div>
    </div>
  );
}

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

  if (isLoading) {
    return (
      <div className="absolute inset-0 bg-background">
        <div className="flex flex-1 h-screen">
          <main className="flex-1 p-2 h-full overflow-hidden flex items-center justify-center">
            <LoadingSpinner />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-background">
      <div className="flex flex-1 h-screen">
        {!isPublicRoute && isAuthenticated && <Navigation />}
        <main className={`flex-1 p-2 ${!isPublicRoute && isAuthenticated ? 'pl-0' : ''} h-full overflow-hidden`}>
          {isPublicRoute || !isAuthenticated ? (
            <div className="h-full flex items-center justify-center">
              {element || <LoadingSpinner />}
            </div>
          ) : (
            <Card className="h-full bg-card text-card-foreground">
              <ScrollArea className="h-full w-full px-6">
                {element || <LoadingSpinner />}
              </ScrollArea>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export default function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <div className="relative min-h-screen flex flex-col rounded-lg overflow-hidden">
          <div className="relative flex-1">
            <TitleBar />
            <div className="pt-10">
              <Suspense fallback={<SuspenseFallback />}>
                <RoutesGuard />
              </Suspense>
            </div>
          </div>
          <Toaster />
        </div>
      </BrowserRouter>
    </ClerkProvider>
  );
}
