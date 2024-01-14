import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { instance } from '@services';
import { signoutForUser } from '@store/user/reducer';

interface SignInData {
  email: string;
  password: string;
}

interface UserAttributes {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  telegramUsername?: string;
  avatar?: {
    prefix: string;
    image: string;
  };
}

interface SignOutData {
  id: string | null;
}

export const signin = createAsyncThunk<string, SignInData, { rejectValue: string }>(
  'auth/signin',
  async (SignInData, thunkAPI) => {
    try {
      const response = await instance.post('/api/User/sign-in', SignInData);
      return response.data;
    } catch (e: unknown) {
      if (axios.isAxiosError(e) && e.response?.data?.message) {
        return thunkAPI.rejectWithValue(e.response.data.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred.');
    }
  }
);

export const signup = createAsyncThunk<string, UserAttributes, { rejectValue: string }>(
  'auth/signup',
  async (UserAttributes, thunkAPI) => {
    try {
      const response = await instance.post('api/User/sign-up', UserAttributes);
      return response.data;
    } catch (e: unknown) {
      if (axios.isAxiosError(e) && e.response?.data?.message) {
        return thunkAPI.rejectWithValue(e.response.data.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred.');
    }
  }
);

export const signout = createAsyncThunk<string, SignOutData, { rejectValue: string }>(
  'auth/signout',
  async (SignOutData, thunkAPI) => {
    try {
      const response = await instance.delete('api/User/sign-out', { data: SignOutData });
      thunkAPI.dispatch(signoutForUser(response.data));
      return response.data;
    } catch (e: unknown) {
      if (axios.isAxiosError(e) && e.response?.data?.message) {
        return thunkAPI.rejectWithValue(e.response.data.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred.');
    }
  }
);
