import { useAppSelector } from '@/store/hooks';

export default function HomePage() {
  const projects = useAppSelector(state => state.projects.items);

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Welcome to Dewey</h1>
        {projects.length === 0 ? (
          <p className="text-muted-foreground">
            Get started by creating your first project using the + button in the sidebar
          </p>
        ) : (
          <p className="text-muted-foreground">
            Select a project from the sidebar to get started
          </p>
        )}
      </div>
    </div>
  );
} 