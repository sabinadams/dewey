import { useState, useRef } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { prepareConnectionTestParams } from '@/lib/database';
import { useErrorHandler } from '@/hooks/use-error-handler';
import { ErrorCategory, ErrorSeverity } from '@/lib/errors';
import { createError } from '@/lib/errors';
import { useToast } from '@/hooks/use-toast';

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
                signal.addEventListener('abort', () => {
                    reject(createError(
                        'Connection test cancelled',
                        ErrorCategory.DATABASE,
                        ErrorSeverity.Info
                    ));
                });
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
                // This is an expected cancellation, no need to handle as error
                return false;
            }
            // The backend already sends properly structured errors, just pass it through
            await handleError(error);
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