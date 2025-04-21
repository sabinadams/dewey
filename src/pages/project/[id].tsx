import { useParams } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';

export default function ProjectPage() {
  const { id } = useParams();
  const project = useAppSelector(state => 
    state.projects.items.find(p => p.id === Number(id))
  );

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