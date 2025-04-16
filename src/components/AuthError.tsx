import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setError } from '../store/slices/authSlice';
import { useEffect } from 'react';

export function AuthError() {
  const { error } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  // Auto-clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(setError(null));
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  if (!error) return null;

  return (
    <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      <p className="font-medium">Authentication Error</p>
      <p className="text-sm">{error}</p>
    </div>
  );
} 