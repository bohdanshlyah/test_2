import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { instance } from '@services';
import { UserRoles } from '@shared/enums';
import { User } from '@shared/interfaces';

//TODO fix endpoints

const USER = {
  firstName: 'Bruce',
  lastName: 'Wayne',
  email: 'admin@test.com',
  // password: 'Password1',
  phoneNumber: '+380505555555',
  telegramUsername: '@example',
  avatar: {
    prefix: '',
    image: ''
  },
  id: '1',
  urls: ['https://linkedin.com/brucewayne'],
  role: UserRoles.Admin
};

// TODO fix type any to User[]
export const getAllUsers = createAsyncThunk<any, number, { rejectValue: string }>(
  'adminPanel/getAll',
  async (page = 1, thunkAPI) => {
    console.log(page); // TODO remove consolelog
    try {
      // const response = await instance.get(`/api/adminPanel/getAllUsers/?_page=${page}`);
      console.log(page);
      //TODO remove moked data
      const response1 = {
        data: [
          USER,
          {
            ...USER,
            email: 'volodymyr@sigma.software',
            id: Math.random().toString()
          },
          {
            ...USER,
            id: Math.random().toString()
          },
          {
            ...USER,
            id: Math.random().toString()
          },
          {
            ...USER,
            email: 'sonya@sigma.software',
            id: Math.random().toString()
          },
          {
            ...USER,
            id: Math.random().toString()
          },
          {
            ...USER,
            id: Math.random().toString()
          },
          {
            ...USER,
            id: Math.random().toString()
          },
          {
            ...USER,
            id: Math.random().toString()
          },
          {
            ...USER,
            id: Math.random().toString()
          },
          {
            ...USER,
            id: Math.random().toString()
          }
        ]
      };
      return response1.data;
    } catch (e: unknown) {
      if (axios.isAxiosError(e) && e.response?.data?.message) {
        return thunkAPI.rejectWithValue(e.response.data.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred.');
    }
  }
);

export const getUsersByIdAndEmail = createAsyncThunk<User[], string, { rejectValue: string }>(
  'adminPanel/searchByEmailAndId',
  async (query, thunkAPI) => {
    try {
      const response = await instance.get(`/api/adminPanel/getByEmailAndId/${query}`);
      return response.data;
    } catch (e: unknown) {
      if (axios.isAxiosError(e) && e.response?.data?.message) {
        return thunkAPI.rejectWithValue(e.response.data.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred.');
    }
  }
);

export const confirmPassword = createAsyncThunk<number, { id: string; password: string }>(
  'adminPanel/confirmPassword',
  async ({ id, password }, thunkAPI) => {
    try {
      // TODO change endpoint
      const response = await instance.post('/api/adminPanel/confirmPassword', {
        id,
        password
      });
      return response.status;
    } catch (e: unknown) {
      if (axios.isAxiosError(e) && e.response?.data?.message) {
        return thunkAPI.rejectWithValue(e.response.data.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred.');
    }
  }
);

export const updateUsersRights = createAsyncThunk<
  number,
  { role: string; users: string[] },
  { rejectValue: string }
>('adminPanel/updateUsersRights', async ({ role, users }, thunkAPI) => {
  try {
    //TODO change endpoint
    const response = await instance.put('/api/adminPanel/updateRole', {
      role,
      users
    });
    return response.status;
  } catch (e: unknown) {
    if (axios.isAxiosError(e) && e.response?.data?.message) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
    return thunkAPI.rejectWithValue('An unknown error occurred.');
  }
});
