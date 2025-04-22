import { useGetCurrentUserQuery } from '@/store/api/auth.api';
import { useGetProjectsQuery } from '@/store/api/projects.api';
import { LoadingSpinner } from '@/components/ui';

export default function HomePage() {
  const { data: authState } = useGetCurrentUserQuery();
  const { data: projects = [], isLoading } = useGetProjectsQuery(authState?.user?.id || '', {
    skip: !authState?.user?.id,
  });

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Welcome to Dewey</h1>
        <p className="text-muted-foreground">
          {projects.length === 0
            ? "Get started by creating your first project using the + button in the sidebar"
            : "Select a project from the sidebar to get started"
          }
        </p>
      </div>
    </div>
  );
} 