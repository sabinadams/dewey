import { RootState } from '../index';

export const selectAuthState = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectReturnTo = (state: RootState) => state.auth.returnTo;
export const selectAuthError = (state: RootState) => state.auth.error; 