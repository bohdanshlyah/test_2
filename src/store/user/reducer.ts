import { createSlice, Reducer } from '@reduxjs/toolkit';

import { getUserByEmail, getUserById, updateUserProfile, updateUsersURLs } from './operations';

import { UserRoles } from '@shared/enums';

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  telegramUsername?: string;
  avatar?: {
    image: string;
    prefix: string;
  };
  id: string;
  urls: string[];
  role: UserRoles;
};

export interface UserState {
  userData: User | null;
  isLoading: boolean;
  error: string | null;
}

const userInitialState: UserState = {
  userData: null,
  isLoading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    signoutForUser(state) {
      return {
        ...state,
        userData: null,
        isLoading: false,
        error: null
      };
    },
    resetUserErrors(state) {
      return {
        ...state,
        error: null
      };
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getUserById.pending, state => {
        return {
          ...state,
          isLoading: true
        };
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        return {
          ...state,
          userData: action.payload,
          isLoading: false,
          error: null
        };
      })
      .addCase(getUserById.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload || 'An unknown error occurred.'
        };
      })
      .addCase(getUserByEmail.pending, state => {
        return {
          ...state,
          isLoading: true
        };
      })
      .addCase(getUserByEmail.fulfilled, (state, action) => {
        return {
          ...state,
          userData: action.payload,
          isLoading: false,
          error: null
        };
      })
      .addCase(getUserByEmail.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload || 'An unknown error occurred.'
        };
      })
      .addCase(updateUserProfile.pending, state => {
        return {
          ...state,
          isLoading: true
        };
      })
      .addCase(updateUserProfile.fulfilled, state => {
        return {
          ...state,
          isLoading: false,
          error: null
        };
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload || 'An unknown error occurred.'
        };
      })
      .addCase(updateUsersURLs.pending, state => {
        return {
          ...state,
          isLoading: true
        };
      })
      .addCase(updateUsersURLs.fulfilled, (state, action) => {
        const userData = { ...state.userData, ...action.payload };
        return {
          ...state,
          userData: userData,
          isLoading: false,
          error: null
        };
      })
      .addCase(updateUsersURLs.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload || 'An unknown error occurred.'
        };
      });
  }
});

export const { resetUserErrors, signoutForUser } = userSlice.actions;

export const userReducer = userSlice.reducer as Reducer<UserState>;
