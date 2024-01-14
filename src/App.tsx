import { CssBaseline, ThemeProvider } from '@mui/material';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import AppTheme from './AppTheme.tsx';

import AdminLayout from '@components/layouts/AdminLayout/AdminLayout';
import Layout from '@components/layouts/MainLayout/MainLayout';
import { PrivateRoute, RestrictedRoute } from '@routes';
import { AppRouter, UserRoles } from '@shared/enums';

const Main = lazy(() => import('@pages/Main/Main.tsx'));
const SignIn = lazy(() => import('@pages/SignIn/SignIn.tsx'));
const SignUp = lazy(() => import('@pages/SignUp/SignUp.tsx'));
const Profile = lazy(() => import('@pages/Profile/Profile.tsx'));
const ChangePassword = lazy(() => import('@pages/ChangePassword/ChangePassword.tsx'));
const NotFound = lazy(() => import('@pages/NotFound/NotFound.tsx'));
const Analytics = lazy(() => import('@pages/Admin/Analytics/Analytics.tsx'));
const Users = lazy(() => import('@pages/Admin/Users/Users.tsx'));
const Projects = lazy(() => import('@pages/Admin/Projects/Projects.tsx'));
const ChangeLog = lazy(() => import('@pages/Admin/ChangeLog/ChangeLog.tsx'));
const Pages = lazy(() => import('@pages/Admin/Pages/Pages.tsx'));

import './styles/index.scss';

function App() {
  return (
    <ThemeProvider theme={AppTheme}>
      <CssBaseline />
      <Routes>
        <Route path={AppRouter.HOME} element={<Layout />}>
          <Route
            path={AppRouter.SIGN_IN}
            element={<RestrictedRoute redirectTo={AppRouter.HOME} component={<SignIn />} />}
          />
          <Route
            path={AppRouter.SIGN_UP}
            element={<RestrictedRoute redirectTo={AppRouter.HOME} component={<SignUp />} />}
          />
          <Route
            index
            element={
              <PrivateRoute
                component={<Main />}
                allowedRoles={[
                  UserRoles.Admin,
                  UserRoles.Mentor,
                  UserRoles.Mentee,
                  UserRoles.Manager
                ]}
                redirectTo={AppRouter.SIGN_IN}
              />
            }
          />
          <Route
            path={AppRouter.PROFILE}
            element={
              <PrivateRoute
                component={<Profile />}
                allowedRoles={[
                  UserRoles.Admin,
                  UserRoles.Mentor,
                  UserRoles.Mentee,
                  UserRoles.Manager
                ]}
                redirectTo={AppRouter.SIGN_IN}
              />
            }
          />
          <Route
            path={AppRouter.CHANGE_PASSWORD}
            element={
              <PrivateRoute
                component={<ChangePassword />}
                allowedRoles={[
                  UserRoles.Admin,
                  UserRoles.Mentor,
                  UserRoles.Mentee,
                  UserRoles.Manager
                ]}
                redirectTo={AppRouter.SIGN_IN}
              />
            }
          />
          <Route path={AppRouter.NOT_FOUND} element={<NotFound />} />
        </Route>
        <Route path={AppRouter.HOME} element={<AdminLayout />}>
          <Route
            path={AppRouter.ADMIN}
            element={
              <PrivateRoute
                component={<Analytics />}
                allowedRoles={[UserRoles.Admin]}
                redirectTo={AppRouter.SIGN_IN}
              />
            }
          />
          <Route
            path={AppRouter.USERS}
            element={
              <PrivateRoute
                component={<Users />}
                allowedRoles={[UserRoles.Admin]}
                redirectTo={AppRouter.SIGN_IN}
              />
            }
          />
          <Route
            path={AppRouter.ADMIN_PROJECTS}
            element={
              <PrivateRoute
                component={<Projects />}
                allowedRoles={[UserRoles.Admin]}
                redirectTo={AppRouter.SIGN_IN}
              />
            }
          />
          <Route
            path={AppRouter.PAGES}
            element={
              <PrivateRoute
                component={<Pages />}
                allowedRoles={[UserRoles.Admin]}
                redirectTo={AppRouter.SIGN_IN}
              />
            }
          />
          <Route
            path={AppRouter.CHANGE_LOG}
            element={
              <PrivateRoute
                component={<ChangeLog />}
                allowedRoles={[UserRoles.Admin]}
                redirectTo={AppRouter.SIGN_IN}
              />
            }
          />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
