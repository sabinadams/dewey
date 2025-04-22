import { Navigation } from '@/components/navigation';
import { Card, ScrollArea } from '@/components/ui';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-1 h-screen bg-background text-foreground">
      <Navigation />
      <main className="flex-1 p-2 pl-0 h-full overflow-hidden">
        <Card className="h-full bg-card text-card-foreground">
          <ScrollArea className="h-full w-full px-6">
            {children}
          </ScrollArea>
        </Card>
      </main>
    </div>
  );
} 