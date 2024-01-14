import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { instance } from '@services';

export const fetchProjects = createAsyncThunk(
  'project/fetchProjects',
  async (_, thunkAPI) => {
    try {
      // TODO: fix endpoint 
      const response = await instance.get('/projects');
      return response.data;
    } catch (e: unknown) {
      if (axios.isAxiosError(e) && e.response?.data?.message) {
        return thunkAPI.rejectWithValue(e.response.data.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred.');
    }
  }
);
