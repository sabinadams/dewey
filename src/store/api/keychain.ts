import { createApi } from '@reduxjs/toolkit/query/react';
import { tauriBaseQuery } from './base';

export const keychainApi = createApi({
  reducerPath: 'keychainApi',
  baseQuery: tauriBaseQuery,
  tagTypes: ['Keychain'],
  endpoints: (builder) => ({
    hasEncryptionKey: builder.query<boolean, void>({
      query: () => ({
        command: 'has_encryption_key',
      }),
    }),
    initializeEncryptionKey: builder.mutation<void, void>({
      query: () => ({
        command: 'initialize_encryption_key',
      }),
      invalidatesTags: ['Keychain'],
    }),
  }),
});

export const { useHasEncryptionKeyQuery, useInitializeEncryptionKeyMutation } = keychainApi;