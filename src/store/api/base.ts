import { invoke } from '@tauri-apps/api/core';

export const tauriBaseQuery = async ({ command, args }: { command: string; args?: any }) => {
  try {
    const result = await invoke(command, args);
    return { data: result };
  } catch (error) {
    return {
      error: {
        status: 'CUSTOM_ERROR',
        error: error instanceof Error ? error.message : 'An error occurred',
      },
    };
  }
}; 