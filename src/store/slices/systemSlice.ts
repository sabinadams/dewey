import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { type as getOSType } from '@tauri-apps/plugin-os'

interface SystemState {
  isMac: boolean
  isLoading: boolean
  error: string | null
}

const initialState: SystemState = {
  isMac: false,
  isLoading: true,
  error: null
}

export const detectOS = createAsyncThunk(
  'system/detectOS',
  async () => {
    const osType = await getOSType()
    return { isMac: osType === 'macos' }
  }
)

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(detectOS.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(detectOS.fulfilled, (state, action) => {
        state.isLoading = false
        state.isMac = action.payload.isMac
        state.error = null
      })
      .addCase(detectOS.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to detect OS'
      })
  }
})

export default systemSlice.reducer 