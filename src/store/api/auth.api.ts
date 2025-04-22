import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { User, AuthState } from '@/types/auth';

// Create a simple in-memory store for the current user
let currentUser: User | null = null;
let returnToPath: string | null = null;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getCurrentUser: builder.query<AuthState, void>({
      queryFn: () => ({
        data: {
          user: currentUser,
          isAuthenticated: !!currentUser,
          isLoading: false,
          returnTo: returnToPath,
          error: null
        }
      }),
      providesTags: ['User'],
    }),
    setUser: builder.mutation<void, User | null>({
      queryFn: (user) => {
        currentUser = user;
        return { data: undefined };
      },
      invalidatesTags: ['User'],
    }),
    setReturnTo: builder.mutation<void, string | null>({
      queryFn: (path) => {
        returnToPath = path;
        return { data: undefined };
      },
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useSetUserMutation,
  useSetReturnToMutation,
} = authApi; 