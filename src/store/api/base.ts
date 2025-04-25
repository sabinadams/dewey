import { invoke } from '@tauri-apps/api/core';

export const tauriBaseQuery = async ({ command, args }: { command: string; args?: any }) => {
  try {
    const result = await invoke(command, args);
    return { data: result };
  } catch (error) {
    // Let the error propagate up to be handled by useErrorHandler in the component
    // or the top-level ErrorBoundary.
    // The backend should ideally return AppError shaped objects, 
    // and parseError (used by useErrorHandler) can handle other error types too.
    throw error;
    /* // Removed previous error handling logic
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
    */
  }
}; 