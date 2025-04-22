import { invoke } from '@tauri-apps/api/core';
import { Project, CreateProjectParams } from '@/types';

export const projectsApi = {
    getUserProjects: async (userId: string): Promise<Project[]> => {
        return invoke<Project[]>('get_user_projects', { userId });
    },

    createProject: async (params: CreateProjectParams): Promise<number> => {
        return invoke<number>('create_project', {
            name: params.name,
            userId: params.user_id,
            customIconData: params.custom_icon_data,
            initialConnection: params.initial_connection
        });
    }
}; 