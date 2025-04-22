import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { LoadingSpinner, Toaster } from '@/components/ui';
import { TitleBar } from '@/components/navigation';
import { AppLayout } from '@/components/AppLayout';
import { useAppDispatch } from '@/hooks';
import { detectOS } from '@/store/slices/systemSlice';
import { useAuthGuard } from '@/hooks';
import routes from '~react-pages';

function RoutesGuard() {
  const { isLoading, isAuthenticated, isPublicRoute } = useAuthGuard();
  const element = useRoutes(routes);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isPublicRoute) {
    return element ?? <LoadingSpinner />;
  }

  return isAuthenticated ? <AppLayout>{element}</AppLayout> : <LoadingSpinner />;
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
        <div className="relative min-h-screen flex flex-col rounded-lg overflow-hidden">
          <AppContent />
          <Toaster />
        </div>
      </BrowserRouter>
    </ClerkProvider>
  );
}
