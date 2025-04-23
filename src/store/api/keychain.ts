import { createApi } from '@reduxjs/toolkit/query/react';
import { tauriBaseQuery } from './base';

export const keychainApi = createApi({
  reducerPath: 'keychainApi',
  baseQuery: tauriBaseQuery,
  tagTypes: ['HasEncryptionKey'],
  endpoints: (builder) => ({
    hasEncryptionKey: builder.query<boolean, void>({
      query: () => ({
        command: 'has_encryption_key',
      }),
      providesTags: ['HasEncryptionKey'],
    }),
    initializeEncryptionKey: builder.mutation<void, void>({
      query: () => ({
        command: 'initialize_encryption_key',
      }),
      invalidatesTags: ['HasEncryptionKey'],
    }),
  }),
});

export const { useHasEncryptionKeyQuery, useInitializeEncryptionKeyMutation } = keychainApi;