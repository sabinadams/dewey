import { useRoutes } from 'react-router-dom';
import routes from '~react-pages';
import { Navigation } from './Navigation';

export function AppLayout() {
  const element = useRoutes(routes);

  return (
    <div className="flex flex-1">
      {/* Sidebar Navigation */}
      <Navigation />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col p-2 pl-0">
        <div className="rounded-lg bg-white flex-1">
          {element}
        </div>
      </main>
    </div>
  );
} 