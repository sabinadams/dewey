import { useParams } from 'react-router-dom';
import { useGetProjectsQuery } from '@/store/api/projects.api';
import { LoadingSpinner } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
export default function ProjectPage() {
  const { id } = useParams();
  const { user } = useAuth();

  const { data: projects = [], isLoading } = useGetProjectsQuery(user?.id || '', {
    skip: !user?.id,
  });

  const project = projects.find(p => p.id === Number(id));

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-muted-foreground">Project not found</div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{project.name}</h1>
        <p className="text-sm text-muted-foreground">
          Created {new Date(project.created_at * 1000).toLocaleDateString()}
        </p>
      </div>

      {/* Project content will go here */}
      <div className="text-muted-foreground">
        Project content coming soon...
      </div>
    </>
  );
} 