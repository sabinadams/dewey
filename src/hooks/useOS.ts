import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { detectOS } from '@/store/slices/ui.slice';

export function useOS() {
  const dispatch = useDispatch<AppDispatch>();
  const isMac = useSelector((state: RootState) => state.ui.isMac);

  useEffect(() => {
    if (isMac === null) {
      dispatch(detectOS());
    }
  }, [dispatch, isMac]);

  return { isMac: isMac ?? false };
} 