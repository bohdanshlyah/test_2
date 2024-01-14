import { createSlice, Reducer } from '@reduxjs/toolkit';

import { fetchProjects } from './operations';

export type Project = {
  userId: number;
  id: number;
  title: string;
  status: 'completed' | 'in progress';
  description: string;
  technologies: string[];
};

export type ProjectState = {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  isLoading: false,
  error: null
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(fetchProjects.pending, state => {
        return {
          ...state,
          isLoading: true
        };
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        const projects  = action.payload;
        return {
          ...state,
          isLoading: false,
          projects,
          error: null
        };
      })
      .addCase(fetchProjects.rejected, state => {
        return {
          ...state,
          isLoading: false,
          //TODO: add error from backend like action.payload || 'An unknown error occurred.'
          error: 'An unknown error occurred.' 
        };
      })
});

export const projectReducer = projectSlice.reducer as Reducer<ProjectState>;
