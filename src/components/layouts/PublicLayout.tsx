import React from 'react';
import TitleBar from '@/components/navigation/TitleBar';

export function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="fixed inset-0 flex flex-col bg-background rounded-2xl overflow-hidden">
            <TitleBar />
            <main className="flex-1 flex items-center justify-center">
                {children}
            </main>
        </div>
    );
} 