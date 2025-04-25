import { useState, useRef } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { prepareConnectionTestParams } from '@/lib/database';
import { useErrorHandler } from '@/hooks/use-error-handler';
import { useToast } from '@/hooks/use-toast';
import { ErrorCategory, ErrorSeverity } from '@/lib/errors';
import { createError } from '@/lib/errors';

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
    const abortControllerRef = useRef<AbortController | null>(null);
    const { handleError } = useErrorHandler();
    const { showToast } = useToast();

    const cancelTest = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
            setIsLoading(false);
        }
    };

    const testConnection = async (values: FormValues) => {
        // Cancel any existing test
        cancelTest();

        // Create new AbortController for this test
        abortControllerRef.current = new AbortController();
        setIsLoading(true);

        try {
            const params = prepareConnectionTestParams(values);
            const signal = abortControllerRef.current.signal;

            // Create a promise that rejects if the signal is aborted
            const abortPromise = new Promise((_, reject) => {
                signal.addEventListener('abort', () => reject(new Error('Connection test cancelled')));
            });

            // Race between the connection test and abort signal
            await Promise.race([
                invoke('test_connection', params),
                abortPromise
            ]);

            if (!signal.aborted) {
                showToast('Connection successful!', 'success');
                return true;
            }
            return false;
        } catch (error) {
            if (error instanceof Error && error.message === 'Connection test cancelled') {
                showToast('Connection test cancelled', 'info');
            } else {
                // Create a specific AppError for connection failures
                const connectionError = createError(
                    error instanceof Error ? error.message : 'Failed to connect to the database.', // Use original message if available
                    ErrorCategory.DATABASE,
                    ErrorSeverity.Error
                );
                await handleError(connectionError);
            }
            return false;
        } finally {
            if (abortControllerRef.current?.signal.aborted) {
                abortControllerRef.current = null;
            }
            setIsLoading(false);
        }
    };

    return {
        testConnection,
        isLoading,
        cancelTest
    };
} 