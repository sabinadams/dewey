import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Plus } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import LoadingSpinner from './LoadingSpinner';

interface Project {
    id: number;
    name: string;
    description: string | null;
    created_at: string;
    user_id: string;
}

export function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const { userId } = useAuth();

    useEffect(() => {
        if (!userId) return;
        
        loadProjects();
    }, [userId]);

    const loadProjects = async () => {
        try {
            const userProjects = await invoke<Project[]>('get_user_projects', { userId });
            setProjects(userProjects);
        } catch (error) {
            console.error('Failed to load projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const createNewProject = async () => {
        if (!userId) return;
        
        try {
            await invoke('create_project', {
                name: 'New Project',
                description: 'A new project',
                userId
            });
            await loadProjects();
        } catch (error) {
            console.error('Failed to create project:', error);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Your Projects</h1>
                <Button onClick={createNewProject}>
                    <Plus className="w-4 h-4 mr-2" />
                    New Project
                </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                    <Card key={project.id} className="hover:bg-gray-50 cursor-pointer transition-colors">
                        <CardHeader>
                            <CardTitle>{project.name}</CardTitle>
                            {project.description && (
                                <CardDescription>{project.description}</CardDescription>
                            )}
                            <CardDescription className="text-sm text-gray-500">
                                Created: {new Date(project.created_at).toLocaleDateString()}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                ))}
                
                {projects.length === 0 && (
                    <div className="col-span-full text-center text-gray-500">
                        No projects yet. Create your first project to get started!
                    </div>
                )}
            </div>
        </div>
    );
} 