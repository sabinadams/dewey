import { useParams } from 'react-router-dom';
import { useGetProjectsQuery, useGetProjectConnectionsQuery } from '@/store/api/projects.api';
import { LoadingSpinner } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
import { SiMysql, SiPostgresql, SiSqlite, SiMongodb } from "@icons-pack/react-simple-icons";

const DatabaseIcon = ({ type }: { type: string }) => {
  switch (type.toLowerCase()) {
    case 'mysql':
      return <SiMysql className="h-5 w-5" />;
    case 'postgres':
      return <SiPostgresql className="h-5 w-5" />;
    case 'mongodb':
      return <SiMongodb className="h-5 w-5" />;
    case 'sqlite':
      return <SiSqlite className="h-5 w-5" />;
    default:
      return null;
  }
};

export default function ProjectPage() {
  const { id } = useParams();
  const { userId } = useAuth();
  const projectId = Number(id);

  const { data: projects = [], isLoading: isLoadingProject } = useGetProjectsQuery(userId ?? '', {
    skip: !userId,
  });

  console.log(projectId);
  const { data: connections = [], isLoading: isLoadingConnections } = useGetProjectConnectionsQuery(projectId, {
    skip: !projectId,
  });

  const project = projects.find(p => p.id === projectId);
  const isLoading = isLoadingProject || isLoadingConnections;

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

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Database Connections</h2>
          {connections.length === 0 ? (
            <div className="text-muted-foreground text-sm">
              No database connections configured yet
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {connections.map((connection) => (
                <div
                  key={connection.connection_name}
                  className="border rounded-lg p-4 hover:border-primary transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <DatabaseIcon type={connection.db_type} />
                    <h3 className="font-medium">{connection.connection_name}</h3>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Type: {connection.db_type}</p>
                    <p>Host: {connection.host}</p>
                    <p>Database: {connection.database}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
} 