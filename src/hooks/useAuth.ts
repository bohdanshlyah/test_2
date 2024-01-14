import Cookies from 'js-cookie';

import { useAppSelector } from './useAppSelector';

import { selectAuthenticated } from '@store/auth/selectors';
import { selectUserData } from '@store/user/selectors';

export const useAuth = () => {
  const user = useAppSelector(selectUserData);
  const isAuthenticated = useAppSelector(selectAuthenticated);
  const token = Cookies.get('accessToken');

  return {
    isAuthenticated,
    user,
    token
  };
};
