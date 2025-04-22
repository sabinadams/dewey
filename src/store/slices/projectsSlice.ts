import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { invoke } from '@tauri-apps/api/core'

export interface Project {
    id: number
    name: string
    user_id: string
    created_at: number
    updated_at: number
    icon_path: string | null
}

interface ProjectsState {
    items: Project[]
    isLoading: boolean
    error: string | null
}

const initialState: ProjectsState = {
    items: [],
    isLoading: false,
    error: null
}

export const fetchProjects = createAsyncThunk(
    'projects/fetchProjects',
    async (userId: string) => {
        const projects = await invoke<Project[]>('get_user_projects', { userId })
        return projects
    }
)

// Define the Connection interface
export interface Connection {
    connection_name: string
    db_type: string
    host: string
    port: string
    username: string
    password: string
    database: string
}


// Define the CreateProjectParams interface
export interface CreateProjectParams {
    name: string
    user_id: string
    custom_icon_data?: string
    initial_connection?: Connection
}

export const createProject = createAsyncThunk(
    'projects/createProject',
    async (params: CreateProjectParams) => {
        // For Tauri commands, we need to use camelCase parameter names
        const projectId = await invoke<number>('create_project', {
            name: params.name,
            userId: params.user_id, // Convert snake_case to camelCase for Tauri
            customIconData: params.custom_icon_data, // Convert snake_case to camelCase for Tauri
            initialConnection: params.initial_connection
        });
        
        // After creating, fetch the updated list
        const projects = await invoke<Project[]>('get_user_projects', { userId: params.user_id });
        
        // Return both the project ID and the updated projects list
        return {
            projectId,
            projects
        };
    }
)

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        clearProjects: (state) => {
            state.items = []
            state.error = null
            state.isLoading = false
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Projects
            .addCase(fetchProjects.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.isLoading = false
                state.items = action.payload
                state.error = null
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message || 'Failed to fetch projects'
            })
            // Create Project
            .addCase(createProject.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.isLoading = false
                state.items = action.payload.projects
                state.error = null
            })
            .addCase(createProject.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message || 'Failed to create project'
            })
    }
})

export const { clearProjects } = projectsSlice.actions
export default projectsSlice.reducer 