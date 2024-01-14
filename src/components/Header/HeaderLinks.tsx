import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { useAppSelector } from '@hooks';
import { AppRouter, Pages } from '@shared/enums';
import { selectUserData } from '@store/user/selectors';

import './Header.scss';

const HeaderLinks = () => {
  // TODO remove user constant
  // const user = {
  //   firstName: 'name',
  //   lastName: 'lastname',
  //   email: 'example@gmail.com',
  //   password: 'Password1',
  //   phoneNumber: '+380505555555',
  //   telegramUsername: '@example',
  //   avatar: 'dir/dir/avatar.png',
  //   id: 1,
  //   role: 'admin'
  // };

  const user = useAppSelector(selectUserData);

  return (
    <Box sx={{ flexGrow: 1, marginLeft: '20px', display: { xs: 'none', sm: 'flex' } }}>
      {Pages.map(page => (
        <Box key={page.title} sx={{ my: 2, p: 0, display: 'block', textTransform: 'none' }}>
          <NavLink
            className="headerLink"
            style={{ textDecoration: 'none', display: 'block', padding: '6px 8px' }}
            to={page.route}
          >
            {page.title}
          </NavLink>
        </Box>
      ))}
      {user?.role === 'admin' && (
        <Box key="admin" sx={{ my: 2, p: 0, display: 'block', textTransform: 'none' }}>
          <NavLink
            className="headerLink"
            style={{ textDecoration: 'none', display: 'block', padding: '6px 8px' }}
            to={AppRouter.ADMIN}
          >
            Admin page
          </NavLink>
        </Box>
      )}
    </Box>
  );
};

export default HeaderLinks;
