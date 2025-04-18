import { Navigation } from '@/components/Navigation';
import { cn } from "@/lib/utils"
import { Card } from '@/components/ui/card';
import { useAppSelector } from '@/store/hooks';
import LoadingSpinner from '@/components/LoadingSpinner';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  // Get projects loading state
  const { isLoading: projectsLoading } = useAppSelector(state => state.projects);

  return (
    <div className="flex flex-1 bg-background text-foreground">
      {/* Sidebar Navigation - Always visible */}
      <Navigation />

      {/* Main Content Area */}
      <main className="flex flex-col flex-1 p-2 pl-0">
        <Card className={cn(
          "flex flex-col flex-1",
          "bg-card",
          "text-card-foreground"
        )}>
          {projectsLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            children
          )}
        </Card>
      </main>
    </div>
  );
} 