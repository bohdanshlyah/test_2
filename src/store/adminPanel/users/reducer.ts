import { createSlice, Reducer } from '@reduxjs/toolkit';

import { User } from '@shared/interfaces';
import {
  getAllUsers,
  getUsersByIdAndEmail,
  updateUsersRights,
  confirmPassword
} from '@store/adminPanel/users/operations.ts';

export interface AdminPanelUsersState {
  users: User[];
  checkedUsers: User[];
  isLoading: boolean;
  error: string | null;
  isCorrectPassword: boolean;
}

const adminPanelUsersInitialState: AdminPanelUsersState = {
  users: [],
  checkedUsers: [],
  isLoading: false,
  error: null,
  isCorrectPassword: false
};

const adminPanelUsersSlice = createSlice({
  name: 'adminPanelUsers',
  initialState: adminPanelUsersInitialState,
  reducers: {
    resetAdminState(state) {
      return {
        ...state,
        checkedUsers: [],
        isCorrectPassword: false,
        error: null
      };
    },
    resetAdminErrors(state) {
      return {
        ...state,
        error: null
      };
    },
    addCheckedUser(state, action) {
      return {
        ...state,
        checkedUsers: state.checkedUsers.concat(action.payload)
      };
    },
    removeCheckedUser(state, action) {
      const { checkedUsers } = state;
      const updatedCheckedUsers = checkedUsers.filter(user => user.id !== action.payload);

      return {
        ...state,
        checkedUsers: updatedCheckedUsers
      };
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getAllUsers.pending, state => {
        return {
          ...state,
          isLoading: true
        };
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        return {
          ...state,
          users: action.payload,
          isLoading: false,
          error: null
        };
      })
      .addCase(getAllUsers.rejected, state => {
        return {
          ...state,
          error: 'An unknown error occurred.'
        };
      })
      .addCase(getUsersByIdAndEmail.pending, state => {
        return {
          ...state,
          isLoading: true
        };
      })
      .addCase(getUsersByIdAndEmail.fulfilled, (state, action) => {
        return {
          ...state,
          users: action.payload,
          isLoading: false,
          error: null
        };
      })
      .addCase(getUsersByIdAndEmail.rejected, state => {
        return {
          ...state,
          isLoading: false,
          error: 'An unknown error occurred.'
        };
      })
      .addCase(updateUsersRights.pending, state => {
        return {
          ...state,
          isLoading: true
        };
      })
      .addCase(updateUsersRights.fulfilled, state => {
        return {
          ...state,
          isLoading: false,
          error: null
        };
      })
      .addCase(updateUsersRights.rejected, state => {
        return {
          ...state,
          isLoading: false,
          error: 'An unknown error occurred.'
        };
      })
      .addCase(confirmPassword.pending, state => {
        return {
          ...state,
          isLoading: true
        };
      })
      .addCase(confirmPassword.fulfilled, state => {
        return {
          ...state,
          isCorrectPassword: true,
          isLoading: false,
          error: null
        };
      })
      .addCase(confirmPassword.rejected, state => {
        return {
          ...state,
          isLoading: false,
          error: 'An unknown error occurred.'
        };
      });
  }
});

export const { addCheckedUser, removeCheckedUser, resetAdminErrors, resetAdminState } =
  adminPanelUsersSlice.actions;

export const adminPanelUsersReducer = adminPanelUsersSlice.reducer as Reducer<AdminPanelUsersState>;
