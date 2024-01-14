import MenuIcon from '@mui/icons-material/Menu';
import { Box, IconButton, List, ListItemIcon, ListItemText } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { AppRouter, UserRoles } from '@shared/enums';
import { Pages } from '@shared/enums';

const user = {
  firstName: 'name',
  lastName: 'lastname',
  email: 'example@gmail.com',
  password: 'Password1',
  phoneNumber: '+380505555555',
  telegramUsername: '@example',
  avatar: 'dir/dir/avatar.png',
  id: 1,
  role: 'admin'
};
const BurgerMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <List sx={{ minWidth: '250px', paddingLeft: '16px' }}>
          {
            Pages.map(page => (
              <Box
                key={page.title}
                onClick={() => {
                  setOpen(false);
                  navigate(page.route);
                }}>
                <ListItemIcon>
                  <ListItemText>
                    <NavLink
                      className="headerLink"
                      style={{ textDecoration: 'none', width: '100%' }}
                      to={page.route}
                    >
                      {page.title}
                    </NavLink>
                  </ListItemText>
                </ListItemIcon>
              </Box>
            ))
          }
          {
            user.role === UserRoles.Admin &&
            <Box onClick={() => {
              setOpen(false);
              navigate(AppRouter.ADMIN);
            }}>
              <ListItemIcon>
                <ListItemText>
                  <NavLink
                    className="headerLink"
                    style={{ textDecoration: 'none' }}
                    to={AppRouter.ADMIN}
                  >
                    Admin page
                  </NavLink>
                </ListItemText>
              </ListItemIcon>
            </Box>
          }
        </List>
      </Drawer>
      <IconButton
        onClick={() => {
          setOpen(!open);
        }}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default BurgerMenu;
