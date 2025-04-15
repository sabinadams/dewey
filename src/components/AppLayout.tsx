import { useRoutes } from 'react-router-dom';
import routes from '~react-pages';
import { Navigation } from './Navigation';

export function AppLayout() {
  const element = useRoutes(routes);

  return (
    <div className="flex h-[calc(100vh-2.5rem)]">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-zinc-900 p-4">
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-white px-4">Navigation</h2>
          <Navigation />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto p-6">
        {element}
      </main>
    </div>
  );
} 