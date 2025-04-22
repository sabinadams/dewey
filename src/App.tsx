import { BrowserRouter, useRoutes, useLocation, useNavigate } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { Toaster, Card, ScrollArea } from '@/components/ui';
import TitleBar from '@/components/navigation/TitleBar';
import { Navigation } from '@/components/navigation';
import { useAuth } from '@clerk/clerk-react';
import routes from '~react-pages';
import { useDispatch } from 'react-redux';
import { setReturnToPath } from '@/store/slices/ui.slice';
import { useGetProjectsQuery } from '@/store/api/projects.api';
function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background rounded-2xl overflow-hidden">
      <div className="w-8 h-8 border-4 border-foreground border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 flex flex-col bg-background rounded-2xl overflow-hidden">
      <TitleBar />
      <div className="flex-1 flex overflow-hidden">
        <Navigation />
        <main className="flex-1 overflow-hidden pr-2 pt-2 pb-2">
          <Card className="h-full rounded-2xl">
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
    <div className="fixed inset-0 flex flex-col bg-background rounded-2xl overflow-hidden">
      <TitleBar />
      <main className="flex-1 flex items-center justify-center">
        {children}
      </main>
    </div>
  );
}

function RoutesGuard() {
  const { isLoaded: isAuthLoaded, isSignedIn, userId } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const element = useRoutes(routes);

  const { data: projects, isLoading: projectsLoading } = useGetProjectsQuery(userId ?? '', {
    skip: !userId,
  });
  
  useEffect(() => {
    if (!isAuthLoaded || (isSignedIn && projectsLoading)) return;

    const isPublicRoute = location.pathname === '/auth';
    const isOnRoot = location.pathname === '/';

    if (isSignedIn) {
      if (isPublicRoute || isOnRoot) {
        console.log(projects);
        if (projects && projects.length > 0) {
          const firstProjectId = projects[0].id;
          navigate(`/project/${firstProjectId}`, { replace: true });
        } else if (isPublicRoute) {
          navigate('/', { replace: true });
        }
      }
    } else if (!isPublicRoute) {
      dispatch(setReturnToPath(location.pathname));
      navigate('/auth', { replace: true });
    }
  }, [isAuthLoaded, isSignedIn, projects, projectsLoading, location.pathname, navigate, dispatch]);

  if (!isAuthLoaded) {
    return <LoadingScreen />;
  }

  const isPublicRoute = location.pathname === '/auth';
  return isPublicRoute ? <PublicLayout>{element}</PublicLayout> : <AppLayout>{element}</AppLayout>;
}

export default function App() {
  return (
    <div className="fixed inset-0 bg-background rounded-2xl overflow-hidden">
      <BrowserRouter>
        <Suspense fallback={<LoadingScreen />}>
          <RoutesGuard />
        </Suspense>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}
