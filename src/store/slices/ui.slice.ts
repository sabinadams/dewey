import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  theme: 'light' | 'dark' | 'system';
  returnToPath: string | null;
}

const initialState: UIState = {
  theme: (localStorage.getItem('theme') as UIState['theme']) || 'system',
  returnToPath: null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<UIState['theme']>) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    setReturnToPath: (state, action: PayloadAction<string | null>) => {
      state.returnToPath = action.payload;
    },
  },
});

export const { setTheme, setReturnToPath } = uiSlice.actions;
export default uiSlice.reducer; 