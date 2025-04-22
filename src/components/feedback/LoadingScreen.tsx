import React from 'react';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background rounded-2xl overflow-hidden">
      <div className="w-8 h-8 border-4 border-foreground border-t-transparent rounded-full animate-spin" />
    </div>
  );
} 