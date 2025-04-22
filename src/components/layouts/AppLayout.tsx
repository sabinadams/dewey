import React from 'react';
import { ScrollArea, Card } from '@/components/ui';
import TitleBar from '@/components/navigation/TitleBar';
import { Navigation } from '@/components/navigation';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 flex flex-col bg-background rounded-2xl overflow-hidden">
      <TitleBar />
      <div className="flex-1 flex overflow-hidden">
        <Navigation />
        <main className="flex-1 overflow-hidden pr-2 pt-2 pb-2">
          <Card className="h-full rounded-2xl">
            <ScrollArea className="h-full w-full px-6">
              {children}
            </ScrollArea>
          </Card>
        </main>
      </div>
    </div>
  );
} 