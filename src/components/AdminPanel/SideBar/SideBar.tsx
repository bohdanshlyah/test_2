import {
  BarChart, 
  ChevronRight,
  FolderShared,
  ManageHistory,
  MenuOpen,
  Person,
  Web
} from '@mui/icons-material';
import {
  Box, 
  Drawer, 
  IconButton, 
  List, 
  ListItem, 
  Divider,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { AdminPages } from '@shared/constants/index';

import './SideBar.scss';

const icons: Record<string, JSX.Element> = {
  'Analytics': <BarChart />,
  'Users': <Person />,
  'Projects': <FolderShared />,
  'Pages': <Web />,
  'Change log': <ManageHistory />
};

const AdminSideBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(!isMobile);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    if (isMobile && open) {
      setOpen((prev: boolean)=> !prev);
    }
    console.log('test', isMobile);
  };
  return(    
    <Box sx={{ display: 'flex' }} className={`sideBarWrapper ${open ? 'opened' : ''}`}>
      <Drawer
        className="sideBar"
        variant="permanent"
        open={open}
      >
        <Box sx={{ paddingLeft: '8px' }}>
          {open ?         
            <IconButton onClick={handleDrawerClose}>            
              <MenuOpen />
            </IconButton>
            :          
            <IconButton onClick={handleDrawerOpen}>
              <ChevronRight />
            </IconButton>
          }
        </Box>
        <Divider />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {AdminPages.map(page => (
              <ListItem key={page.title} disablePadding>
                <NavLink
                  className="link"
                  to={page.route}
                  onClick={handleClick}
                >  
                  <Box className="iconWrapper">{icons[page.title]}</Box>
                  <Typography variant="body1">{page.title}</Typography> 
                </NavLink>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default AdminSideBar;
