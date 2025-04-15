import { useRoutes } from 'react-router-dom';
import routes from '~react-pages';
import { Navigation } from './Navigation';

export function AppLayout() {
  const element = useRoutes(routes);

  return (
    <div className="flex h-[calc(100vh)] justify-center">
      {/* Sidebar Navigation */}
      <aside className="mt-8 p-4">
        <div className="space-y-6">
          <Navigation />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto p-2 pl-0 h-full">
        <div className="rounded-lg bg-white h-full">
          {element}
        </div>
      </main>
    </div>
  );
} 