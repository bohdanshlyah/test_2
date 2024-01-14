import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { User } from './reducer';

import { instance } from '@services';

interface UserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  telegramUsername?: string;
  avatar?: {
    prefix: string;
    image: string;
  };
}

// TODO check the endpoints when they are approved by the backend.
export const getUserById = createAsyncThunk<User, string, { rejectValue: string }>(
  'user/getUserById',
  async (id, thunkAPI) => {
    try {
      const response = await instance.get(`/api/User/${id}`);
      // return = response.data
      const user = response.data;
      user.role = 'admin';
      return user;
    } catch (e: unknown) {
      if (axios.isAxiosError(e) && e.response?.data?.message) {
        return thunkAPI.rejectWithValue(e.response.data.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred.');
    }
  }
);

export const getUserByEmail = createAsyncThunk<User, string, { rejectValue: string }>(
  'user/getUserByEmail',
  async (email, thunkAPI) => {
    try {
      const response = await instance.get(`/api/User/${email}`);
      return response.data;
    } catch (e: unknown) {
      if (axios.isAxiosError(e) && e.response?.data?.message) {
        return thunkAPI.rejectWithValue(e.response.data.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred.');
    }
  }
);

// TODO - possible functionality extension.
export const updateUserProfile = createAsyncThunk<
  number,
  UserAttributes | { id: string; password: string },
  { rejectValue: string }
>('user/updateUserProfile', async (user, thunkAPI) => {
  const { id, ...userData } = user;
  try {
    const response = await instance.put(`/api/User/${id}`, userData);
    return response.status;
  } catch (e: unknown) {
    if (axios.isAxiosError(e) && e.response?.data?.message) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
    return thunkAPI.rejectWithValue('An unknown error occurred.');
  }
});

export const updateUsersURLs = createAsyncThunk<
  User,
  { userId: string; URLs: string[] },
  { rejectValue: string }
>('user/updateURLs', async ({ userId, URLs }, thunkAPI) => {
  try {
    const response = await instance.put(`api/user/updateURLs/${userId}`, URLs);
    return response.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e) && e.response?.data?.message) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
    return thunkAPI.rejectWithValue('An unknown error occurred.');
  }
});
