import { useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { toast } from 'sonner';

type TestConnectionParams = {
    dbType: string;
    host: string;
    port: string;
    username: string;
    password: string;
    database: string;
} & Record<string, unknown>;

export function useTestConnection() {
    const [isLoading, setIsLoading] = useState(false);

    const testConnection = async (params: TestConnectionParams) => {
        setIsLoading(true);
        try {
            console.log(params)
            await invoke('test_connection', params);
            toast.success('Connection successful!');
            return true;
        } catch (error) {
            console.log(error)
            toast.error('Connection failed', {
                description: error instanceof Error ? error.message : 'Failed to test connection'
            });
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        testConnection,
        isLoading
    };
} 