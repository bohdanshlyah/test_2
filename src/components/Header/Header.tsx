import SearchIcon from '@mui/icons-material/Search';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme
} from '@mui/material';

import BurgerMenu from '@components/BurgerMenu/BurgerMenu.tsx';
import HeaderLinks from '@components/Header/HeaderLinks.tsx';
import HeaderLogo from '@components/Header/HeaderLogo.tsx';
import HeaderUserButton from '@components/Header/HeaderUserButton.tsx';
import { useAuth } from '@hooks';

const Header = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  const { user, token } = useAuth();
  const access = user && token;

  return (
    <AppBar sx={{ background: '#fff', color: '#000', position: 'static' }}>
      <Container>
        <Toolbar>
          {access ? (
            <HeaderLogo />
          ) : (
            <Box sx={{ mx: 'auto' }}>
              <HeaderLogo />
            </Box>
          )}
          {isMatch
            ? access && (
              <Box sx={{ marginLeft: { xs: '0', sm: '15px' } }}>
                <BurgerMenu />
              </Box>
            )
            : access && <HeaderLinks />}
          {access && (
            <Box sx={{ flexGrow: 0, marginLeft: 'auto' }}>
              <IconButton
                sx={{ marginRight: { xs: '0', sm: '15px' } }}
                size="large"
                aria-label="search"
                color="inherit"
              >
                <SearchIcon />
              </IconButton>
              <HeaderUserButton />
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
