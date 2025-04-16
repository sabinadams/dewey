import { Navigation } from './Navigation';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-1">
      {/* Sidebar Navigation */}
      <Navigation />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col p-2 pl-0">
        <div className="rounded-lg bg-white flex-1">
          {children}
        </div>
      </main>
    </div>
  );
} 