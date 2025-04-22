import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setUser, setLoading, setError } from '@/store/slices/auth.slice';
import { User } from '@/types/auth';

export function useAuth() {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  const updateUser = (user: User | null) => {
    dispatch(setUser(user));
  };

  const updateLoading = (isLoading: boolean) => {
    dispatch(setLoading(isLoading));
  };

  const updateError = (error: string | null) => {
    dispatch(setError(error));
  };

  return {
    ...authState,
    updateUser,
    updateLoading,
    updateError
  };
} 