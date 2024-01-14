import { RootState } from '@store';

export const selectUserError = (state: RootState) => state.user.error;
export const selectUserData = (state: RootState) => state.user.userData;
