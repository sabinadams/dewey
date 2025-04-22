import { createApi } from '@reduxjs/toolkit/query/react';
import { tauriBaseQuery } from './base';
import { User, LoginCredentials, RegisterCredentials } from '@/types/auth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: tauriBaseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    login: builder.mutation<User, LoginCredentials>({
      query: (credentials) => ({
        command: 'login',
        args: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    register: builder.mutation<User, RegisterCredentials>({
      query: (credentials) => ({
        command: 'register',
        args: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        command: 'logout',
      }),
      invalidatesTags: ['User'],
    }),
    getCurrentUser: builder.query<User | null, void>({
      query: () => ({
        command: 'get_current_user',
      }),
      providesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
} = authApi; 