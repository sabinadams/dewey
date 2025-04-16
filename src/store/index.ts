import { configureStore } from '@reduxjs/toolkit'
import appReducer from '@/store/slices/appSlice'
import systemReducer from '@/store/slices/systemSlice'
import authReducer from '@/store/slices/authSlice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    system: systemReducer,
    auth: authReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 