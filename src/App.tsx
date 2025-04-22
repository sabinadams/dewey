import { BrowserRouter, useRoutes, useLocation, useNavigate } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { LoadingSpinner, Toaster, Card, ScrollArea } from '@/components/ui';
import TitleBar from '@/components/navigation/TitleBar';
import { Navigation } from '@/components/navigation';
import { useAuth } from '@clerk/clerk-react';
import routes from '~react-pages';
import { useDispatch } from 'react-redux';
import { setReturnToPath } from '@/store/slices/ui.slice';

function LoadingScreen() {
  return (
    <div className="h-screen flex items-center justify-center bg-background">
      <LoadingSpinner />
    </div>
  );
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col bg-background">
      <TitleBar />
      <div className="flex-1 flex overflow-hidden">
        <Navigation />
        <main className="flex-1 overflow-hidden">
          <Card className="h-full bg-card text-card-foreground">
            <ScrollArea className="h-full w-full px-6">
              {children}
            </ScrollArea>
          </Card>
        </main>
      </div>
    </div>
  );
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col bg-background">
      <TitleBar />
      <main className="flex-1 flex items-center justify-center">
        {children}
      </main>
    </div>
  );
}

function RoutesGuard() {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const element = useRoutes(routes);

  // Handle auth redirects
  useEffect(() => {
    if (!isLoaded) return;

    const isPublicRoute = location.pathname === '/auth';
    
    if (isSignedIn && isPublicRoute) {
      navigate('/', { replace: true });
    } else if (!isSignedIn && !isPublicRoute) {
      dispatch(setReturnToPath(location.pathname));
      navigate('/auth', { replace: true });
    }
  }, [isLoaded, isSignedIn, location.pathname, navigate, dispatch]);

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  const isPublicRoute = location.pathname === '/auth';
  
  if (isPublicRoute) {
    return <PublicLayout>{element}</PublicLayout>;
  }

  return <AppLayout>{element}</AppLayout>;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="h-screen flex flex-col bg-background">
        <Suspense fallback={<LoadingScreen />}>
          <RoutesGuard />
        </Suspense>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}
