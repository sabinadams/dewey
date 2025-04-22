import {
  BrowserRouter,
} from 'react-router-dom';
import { Suspense } from 'react';
import { Toaster } from '@/components/ui';

import { LoadingScreen } from '@/components/feedback/LoadingScreen';
import { RouteRenderer } from '@/components/routing/RouteRenderer';


export default function App() {
  return (
    <div className="fixed inset-0 bg-background rounded-2xl overflow-hidden">
      <BrowserRouter>
        <Suspense fallback={<LoadingScreen />}>
          <RouteRenderer /> 
        </Suspense>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}
