import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { type as getOSType } from '@tauri-apps/plugin-os';

interface UIState {
  theme: 'light' | 'dark' | 'system';
  returnToPath: string | null;
  isMac: boolean | null;
}

const initialState: UIState = {
  theme: (localStorage.getItem('theme') as UIState['theme']) || 'system',
  returnToPath: null,
  isMac: null,
};

export const detectOS = createAsyncThunk(
  'ui/detectOS',
  async () => {
    const osType = await getOSType();
    return osType === 'macos';
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(detectOS.fulfilled, (state, action) => {
      state.isMac = action.payload;
    });
  },
});

export const { setTheme, setReturnToPath } = uiSlice.actions;
export default uiSlice.reducer; 