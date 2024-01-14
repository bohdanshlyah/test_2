import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { Logs } from './reducer';

import { instance } from '@services';

export const getLogs = createAsyncThunk<Logs, undefined, { rejectValue: string }>(
  'changeLog/getLogs',
  async (_, thunkAPI) => {
    try {
      // TO-DO: check endpoint
      const response = await instance.get('/admin/logs');
      return response.data.logs;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred.');
    }
  }
);
