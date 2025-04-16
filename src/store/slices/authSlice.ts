import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserInfo {
  id: string
  email?: string
  firstName?: string
  lastName?: string
  imageUrl?: string
  username?: string
}

interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  user: UserInfo | null
  error: string | null
  returnTo: string | null // Store the path to return to after auth
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  error: null,
  returnTo: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<UserInfo>) => {
      state.isAuthenticated = true
      state.user = action.payload
      state.isLoading = false
      state.error = null
    },
    setUnauthenticated: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.isLoading = false
      state.error = null
    },
    updateUserInfo: (state, action: PayloadAction<Partial<UserInfo>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.isLoading = false
    },
    setReturnTo: (state, action: PayloadAction<string | null>) => {
      state.returnTo = action.payload
    }
  }
})

export const {
  setAuthenticated,
  setUnauthenticated,
  updateUserInfo,
  setLoading,
  setError,
  setReturnTo
} = authSlice.actions

export default authSlice.reducer 