import { invoke } from '@tauri-apps/api/core';
import { AppError, ErrorCategory, ErrorSeverity, parseError } from '@/lib/errors'; // Import necessary items

export const tauriBaseQuery = async ({ command, args }: { command: string; args?: any }) => {
  try {
    const result = await invoke(command, args);
    return { data: result };
  } catch (rawError) {
    console.error(`Error invoking command '{command}':`, rawError); // Log the raw error

    // Attempt to parse the error into our AppError structure
    const appError = parseError(rawError);

    // Throw a standard Error, embedding the JSON of the structured AppError in the message
    throw new Error(JSON.stringify(appError));
  }
}; 