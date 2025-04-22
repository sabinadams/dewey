import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Project, CreateProjectParams } from '@/types'
import { projectsApi } from '@/api'

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
        return projectsApi.getUserProjects(userId)
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

export const createProject = createAsyncThunk(
    'projects/createProject',
    async (params: CreateProjectParams, { dispatch }) => {
        const projectId = await projectsApi.createProject(params)
        await dispatch(fetchProjects(params.user_id))
        return projectId
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
            .addCase(createProject.fulfilled, (state) => {
                state.isLoading = false
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