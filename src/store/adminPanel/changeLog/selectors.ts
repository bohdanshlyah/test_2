import { RootState } from '@store';

export const selectLogsError = (state: RootState) => state.changeLog.error;
export const selectLogs = (state: RootState) => state.changeLog.logs;
