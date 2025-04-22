import { Navigation } from '@/components/navigation';
import { Card, ScrollArea, LoadingSpinner } from '@/components/ui';
import { useAppSelector } from '@/hooks';
import { selectAuthUser } from '@/store/selectors';
import { useGetProjectsQuery } from '@/store/api/projects.api';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const user = useAppSelector(selectAuthUser);
  const { isLoading } = useGetProjectsQuery(user?.id || '', {
    skip: !user?.id,
  });

  return (
    <div className="flex flex-1 h-screen bg-background text-foreground">
      <Navigation />
      <main className="flex-1 p-2 pl-0 h-full overflow-hidden">
        <Card className="h-full bg-card text-card-foreground">
          {isLoading ? (
            <div className="h-full grid place-items-center">
              <LoadingSpinner />
            </div>
          ) : (
            <ScrollArea className="h-full w-full px-6">
              {children}
            </ScrollArea>
          )}
        </Card>
      </main>
    </div>
  );
} 