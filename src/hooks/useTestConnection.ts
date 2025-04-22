import { useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { toast } from 'sonner';
import { prepareConnectionTestParams } from '@/lib/database';

type FormValues = {
    databaseType?: string;
    sqliteType?: string;
    host?: string;
    port?: string;
    username?: string;
    password?: string;
    database?: string;
};

export function useTestConnection() {
    const [isLoading, setIsLoading] = useState(false);

    const testConnection = async (values: FormValues) => {
        setIsLoading(true);
        try {
            const params = prepareConnectionTestParams(values);
            await invoke('test_connection', params);
            toast.success('Connection successful!');
            return true;
        } catch (error) {
            console.error('Connection test failed:', error);
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