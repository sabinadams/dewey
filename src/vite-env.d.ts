/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client-react" />
/// <reference types="vite-plugin-svgr/client" />

declare module '~react-pages' {
  import type { RouteObject } from 'react-router-dom'
  const routes: RouteObject[]
  export default routes
}

declare module '*.svg' {
  import React from 'react';
  import { SVGProps } from 'react';
  export const ReactComponent: React.FC<SVGProps<SVGSVGElement> & { title?: string }>;
  const src: string;
  export default src;
} 