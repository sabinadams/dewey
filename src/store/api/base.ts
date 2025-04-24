import { invoke } from '@tauri-apps/api/core';

export const tauriBaseQuery = async ({ command, args }: { command: string; args?: any }) => {
  try {
    const result = await invoke(command, args);
    return { data: result };
  } catch (error) {
    // If the error is already in the correct format, return it directly
    if (error && typeof error === 'object' && 'message' in error && 'category' in error) {
      return { error };
    }
    
    // Otherwise, wrap it in our error structure
    return {
      error: {
        message: error instanceof Error ? error.message : String(error),
        category: 'UNKNOWN',
        severity: 'Error'
      }
    };
  }
}; 