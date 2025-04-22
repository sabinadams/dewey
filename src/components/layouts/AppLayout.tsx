import { Navigation } from '@/components/navigation';
import { LoadingSpinner } from '@/components/ui';
import { useGetCurrentUserQuery } from '@/store/api/auth.api';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { data: authState } = useGetCurrentUserQuery();
  const user = authState?.user;

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Navigation />
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
} 