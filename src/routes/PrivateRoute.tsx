import { Navigate } from 'react-router-dom';

import { useAuth } from '@hooks';
import { AppRouter } from '@shared/enums';

type PrivateRouteProps = {
  component: JSX.Element;
  redirectTo: string;
  allowedRoles: string[];
};

export const PrivateRoute = ({
  component: Component,
  redirectTo = AppRouter.HOME,
  allowedRoles
}: PrivateRouteProps): JSX.Element => {
  const { isAuthenticated, user, token } = useAuth();
  const shouldRedirect = !isAuthenticated && user && !allowedRoles.includes(user?.role);
  if (!isAuthenticated || !token) {
    return <Navigate to={redirectTo} />;
  }
  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};
