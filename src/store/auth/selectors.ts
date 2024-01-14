import { RootState } from '@store';

export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthenticated = (state: RootState) => state.auth.authenticated;
export const selectAuthId = (state: RootState) => state.auth.userId;
