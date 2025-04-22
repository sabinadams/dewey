import { RootState } from './index';

// Auth selectors
export const selectAuthState = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectReturnTo = (state: RootState) => state.auth.returnTo;

// Projects selectors
export const selectProjectsState = (state: RootState) => state.projects;
export const selectProjects = (state: RootState) => state.projects.items;
export const selectProjectsLoading = (state: RootState) => state.projects.isLoading;
export const selectProjectsError = (state: RootState) => state.projects.error;
export const selectProjectById = (projectId: number) => (state: RootState) => 
    state.projects.items.find(project => project.id === projectId);

// System selectors
export const selectSystemState = (state: RootState) => state.system;
export const selectIsMac = (state: RootState) => state.system.isMac; 