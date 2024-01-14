import { Navigate } from 'react-router-dom';

import { useAuth } from '@hooks';
import { AppRouter } from '@shared/enums';

type RestrictedRouteProps = {
  component: JSX.Element;
  redirectTo: string;
};

export const RestrictedRoute = ({
  component: Component,
  redirectTo = AppRouter.HOME
}: RestrictedRouteProps): JSX.Element => {
  const { token, user, isAuthenticated } = useAuth();
  const shouldRedirect = token && user && isAuthenticated;
  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};
