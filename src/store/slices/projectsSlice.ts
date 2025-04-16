import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { invoke } from '@tauri-apps/api/core'

export interface Project {
    id: number
    name: string
    user_id: string
    created_at: number
    updated_at: number
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

export const createProject = createAsyncThunk(
    'projects/createProject',
    async (userId: string, { dispatch }) => {
        await invoke('create_project', {
            name: 'New Project',
            userId
        });
        // After creating, fetch the updated list
        const projects = await invoke<Project[]>('get_user_projects', { userId });
        return projects;
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
                state.items = action.payload
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