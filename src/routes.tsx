import { RouteObject } from 'react-router-dom';
import HomePage from '@/pages/index';
import AuthPage from '@/pages/auth';
import AuthCallback from '@/pages/auth/callback';
import ProjectPage from '@/pages/project/[id]';
import OnboardingPage from '@/pages/onboarding';
import NotFoundPage from '@/pages/404';
import CreateProjectPage from './pages/project/create';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path: '/auth/callback',
    element: <AuthCallback />,
  },
  {
    path: '/project/:id',
    element: <ProjectPage />,
  },
  {
    path: '/project/create',
    element: <CreateProjectPage />,
  },
  {
    path: '/onboarding',
    element: <OnboardingPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]; 