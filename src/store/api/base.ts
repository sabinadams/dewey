import { invoke } from '@tauri-apps/api/core';
import { parseError } from '@/lib/errors'; // Import necessary items

export const tauriBaseQuery = async ({ command, args }: { command: string; args?: any }) => {
  try {
    const result = await invoke(command, args);
    return { data: result };
  } catch (rawError) {
    // Attempt to parse the error into our AppError structure
    const appError = parseError(rawError);

    // Throw a standard Error, embedding the JSON of the structured AppError in the message
    throw new Error(JSON.stringify(appError));
  }
}; 