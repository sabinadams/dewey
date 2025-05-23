import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { projectsApi } from './api/projects.api'
import { onboardingApi } from './api/onboarding.api'
import uiReducer from './slices/ui.slice'
import { keychainApi } from './api/keychain'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
    [onboardingApi.reducerPath]: onboardingApi.reducer,
    [keychainApi.reducerPath]: keychainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(projectsApi.middleware)
      .concat(onboardingApi.middleware)
      .concat(keychainApi.middleware),
})

// Enable refetchOnFocus and refetchOnReconnect
setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 