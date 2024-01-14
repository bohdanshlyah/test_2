import { createSlice, Reducer } from '@reduxjs/toolkit';

import { getLogs } from './operations.ts';

export type Credentials = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type UserLogInfo = {
  createdDate: string;
  curentRole: string;
  prevUserRole?: string;
  userCredentials: Credentials;
};

// TO-DO: check logs type
export type Logs = {
  date: string;
  time: string;
  adminCredentials: Credentials;
  userInfo: Array<UserLogInfo>;
};

export type LogsState = {
  logs: Logs | null;
  isLoading: boolean;
  error: string | null;
};

const changeLogInitialState: LogsState = {
  logs: null,
  isLoading: false,
  error: null
};

const changeLogSlice = createSlice({
  name: 'changeLog',
  initialState: changeLogInitialState,
  reducers: {
    resetLogsErrors(state) {
      return {
        ...state,
        error: null
      };
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getLogs.pending, state => {
        return {
          ...state,
          isLoading: true,
          error: null
        };
      })
      .addCase(getLogs.fulfilled, (state, action) => {
        const logsData = action.payload;
        return {
          ...state,
          logs: logsData,
          isLoading: false,
          error: null
        };
      })
      .addCase(getLogs.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload || 'An unknown error occurred.'
        };
      });
  }
});

export const { resetLogsErrors } = changeLogSlice.actions;

export const changeLogReducer = changeLogSlice.reducer as Reducer<LogsState>;
