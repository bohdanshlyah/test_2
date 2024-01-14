import { RootState } from '@store';

export const selectError = (state: RootState) => state.project.error;
export const selectProjects = (state: RootState) => state.project.projects;
