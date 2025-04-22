import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '@/store'
import { User, AuthState } from '@/types'

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
    setAuthenticated: (state, action: PayloadAction<User>) => {
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
    updateUserInfo: (state, action: PayloadAction<Partial<User>>) => {
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

// Thunk action to handle authentication
export const authenticateUser = (userInfo: User) => (dispatch: AppDispatch) => {
  dispatch(setAuthenticated(userInfo))
}

export default authSlice.reducer 