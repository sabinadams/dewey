import { createApi } from '@reduxjs/toolkit/query/react';
import { Project, CreateProjectParams } from '@/types';
import { tauriBaseQuery } from './base';

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  baseQuery: tauriBaseQuery,
  tagTypes: ['Project'],
  endpoints: (builder) => ({
    getProjects: builder.query<Project[], string>({
      query: (userId) => ({
        command: 'get_user_projects',
        args: { userId },
      }),
      providesTags: ['Project'],
    }),
    createProject: builder.mutation<number, CreateProjectParams>({
      query: (params) => ({
        command: 'create_project',
        args: {
          name: params.name,
          userId: params.user_id,
          customIconData: params.custom_icon_data,
          initialConnection: params.initial_connection,
        },
      }),
      invalidatesTags: ['Project'],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
} = projectsApi; 