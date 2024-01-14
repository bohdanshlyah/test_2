import { createSlice, Reducer } from '@reduxjs/toolkit';

import { signup, signin, signout } from './operations';

export interface AuthState {
  userId: string | null;
  authenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const authInitialState: AuthState = {
  userId: null,
  authenticated: false,
  isLoading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    resetAuthErrors(state) {
      return {
        ...state,
        error: null
      };
    }
  },

  extraReducers: builder => {
    builder
      .addCase(signin.pending, state => {
        return {
          ...state,
          isLoading: true,
          error: null
        };
      })
      .addCase(signin.fulfilled, (state, action) => {
        const userId = action.payload;
        return {
          ...state,
          userId,
          isLoading: false,
          authenticated: true,
          error: null
        };
      })
      .addCase(signin.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload || 'An unknown error occurred.'
        };
      })
      .addCase(signup.pending, state => {
        return {
          ...state,
          isLoading: true
        };
      })
      .addCase(signup.fulfilled, (state, action) => {
        const userId = action.payload;

        return {
          ...state,
          isLoading: false,
          authenticated: true,
          userId,
          error: null
        };
      })
      .addCase(signup.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload || 'An unknown error occurred.'
        };
      })
      .addCase(signout.pending, state => {
        return {
          ...state,
          isLoading: true
        };
      })
      .addCase(signout.fulfilled, state => {
        return {
          ...state,
          userId: null,
          authenticated: false,
          isLoading: false,
          error: null
        };
      })
      .addCase(signout.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload || 'An unknown error occurred.'
        };
      });
  }
});

export const { resetAuthErrors } = authSlice.actions;

export const authReducer = authSlice.reducer as Reducer<AuthState>;
