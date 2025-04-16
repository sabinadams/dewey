import { useAppSelector } from '../store/hooks';
import LoadingSpinner from './LoadingSpinner';

interface AuthAwareComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AuthAwareComponent({ 
  children, 
  fallback = <LoadingSpinner /> 
}: AuthAwareComponentProps) {
  const { isLoading, isAuthenticated } = useAppSelector(state => state.auth);

  if (isLoading) {
    return fallback;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
} 