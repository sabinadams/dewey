import { RootState } from '../index';
import { createSelector } from '@reduxjs/toolkit';

export const selectProjectsState = (state: RootState) => state.projects;

export const selectProjects = createSelector(
    selectProjectsState,
    (projectsState) => projectsState.items
);

export const selectProjectsLoading = createSelector(
    selectProjectsState,
    (projectsState) => projectsState.isLoading
);

export const selectProjectsError = createSelector(
    selectProjectsState,
    (projectsState) => projectsState.error
);

export const selectProjectById = (projectId: number) => createSelector(
    selectProjects,
    (projects) => projects.find(project => project.id === projectId)
); 