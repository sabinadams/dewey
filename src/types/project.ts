import { Connection } from './connection';

export interface Project {
    id: number;
    name: string;
    user_id: string;
    created_at: number;
    updated_at: number;
    icon_path: string | null;
}

export interface CreateProjectParams {
    name: string;
    user_id: string;
    custom_icon_data?: string;
    initial_connection?: Connection;
} 