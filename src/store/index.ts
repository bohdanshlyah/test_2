import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { changeLogReducer } from './adminPanel/changeLog/reducer';
import { authReducer, AuthState } from './auth/reducer';
import { projectReducer } from './project/reducer';
import { userReducer, UserState } from './user/reducer';

import { adminPanelUsersReducer } from '@store/adminPanel/users/reducer.ts';

const createPersistConfig = (key: string) => ({
  key,
  storage
});

export const store = configureStore({
  reducer: {
    auth: persistReducer<AuthState>(createPersistConfig('auth'), authReducer),
    user: persistReducer<UserState>(createPersistConfig('user'), userReducer),
    changeLog: changeLogReducer,
    project: projectReducer,
    adminPanelUsers: adminPanelUsersReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
