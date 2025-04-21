import { Navigation } from '@/components/Navigation';
import { cn } from "@/lib/utils"
import { Card } from '@/components/ui/card';
import { useAppSelector } from '@/store/hooks';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  // Get projects loading state
  const { isLoading: projectsLoading } = useAppSelector(state => state.projects);

  return (
    <div className="flex flex-1 h-screen bg-background text-foreground">
      <Navigation />
      <main className="flex-1 p-2 pl-0 h-full overflow-hidden">
        <Card className="h-full bg-card text-card-foreground">
          {projectsLoading ? (
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