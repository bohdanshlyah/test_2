import { Container, Box, Grid, Link } from '@mui/material';

import { AppRouter } from '@shared/enums';
import './SignInFormNavigation.scss';

const SignInFormNavigation = () => {
  return (
    <Container component="main" maxWidth={false} className="NavigationFormContainer">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Grid container>
          <Grid item xs>
            <Link href={AppRouter.NOT_FOUND} variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href={AppRouter.SIGN_UP} variant="body2">
              Don&prime;t have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SignInFormNavigation;
