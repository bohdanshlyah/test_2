import { RootState } from '@store';

export const selectAdminPanelUsersError = (state: RootState) => state.adminPanelUsers.error;
export const selectAdminPanelCheckedUsers = (state: RootState) =>
  state.adminPanelUsers.checkedUsers;
export const selectAdminPanelUsersData = (state: RootState) => state.adminPanelUsers.users;
export const selectAdminPanelIsCorrectPassword = (state: RootState) =>
  state.adminPanelUsers.isCorrectPassword;
