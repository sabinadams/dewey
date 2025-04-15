/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client-react" />

interface RouteModule {
  default: React.ComponentType;
  [key: string]: any;
}

declare module 'virtual:pages' {
  import type { ComponentType } from 'react'
  const routes: {
    path: string
    element: ComponentType
  }[]
  export default routes
}

declare module '~react-pages' {
  import type { RouteObject } from 'react-router-dom'
  const routes: RouteObject[]
  export default routes
}
