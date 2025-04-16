import { Navigation } from '@/components/Navigation';
import { cn } from "@/lib/utils"
import { Card } from '@/components/ui/card';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-1">
      {/* Sidebar Navigation */}
      <Navigation />

      {/* Main Content Area */}
      <main className="flex flex-col flex-1 p-2 pl-0">
        <Card className={cn(
          "flex flex-col flex-1",
          "bg-zinc-50",
          "text-zinc-900"
        )}>
          {children}
        </Card>
      </main>
    </div>
  );
} 