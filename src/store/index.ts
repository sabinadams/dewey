import { configureStore } from '@reduxjs/toolkit'
import systemReducer from '@/store/slices/systemSlice'
import authReducer from '@/store/slices/authSlice'

export const store = configureStore({
  reducer: {
    system: systemReducer,
    auth: authReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 