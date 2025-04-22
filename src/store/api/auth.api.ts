import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { User, AuthState } from '@/types/auth';

// Create a simple in-memory store for the current user
let currentUser: User | null = null;

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
  }),
});

export const {
  useGetCurrentUserQuery,
  useSetUserMutation,
} = authApi; 