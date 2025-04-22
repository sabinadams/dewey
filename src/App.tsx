import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter, useRoutes, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import { LoadingSpinner, Toaster } from '@/components/ui';
import { TitleBar } from '@/components/navigation';
import AppLayout from '@/components/layouts/AppLayout';
import { useAuthGuard } from '@/hooks';
import { publicRoutes } from '@/hooks/useAuthGuard';
import routes from '~react-pages';
import ClerkAuthSync from '@/components/auth/ClerkAuthSync';

function RoutesGuard() {
  const { isLoading, isAuthenticated } = useAuthGuard();
  const location = useLocation();
  const element = useRoutes(routes);
  const isPublicRoute = publicRoutes.some(route => location.pathname.startsWith(route));

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isPublicRoute) {
    return element ?? <LoadingSpinner />;
  }

  return isAuthenticated ? <AppLayout>{element}</AppLayout> : <LoadingSpinner />;
}

function AppContent() {
  return (
    <>
      <TitleBar />
      <ClerkAuthSync />
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
