import { createApi } from '@reduxjs/toolkit/query/react';
import { type as getOSType } from '@tauri-apps/plugin-os';
import { tauriBaseQuery } from './base';

interface OSInfo {
  isMac: boolean;
}

export const systemApi = createApi({
  reducerPath: 'systemApi',
  baseQuery: tauriBaseQuery,
  endpoints: (builder) => ({
    detectOS: builder.query<OSInfo, void>({
      queryFn: async () => {
        try {
          const osType = await getOSType();
          return { data: { isMac: osType === 'macos' } };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Failed to detect OS',
            },
          };
        }
      },
    }),
  }),
});

export const {
  useDetectOSQuery,
} = systemApi; 