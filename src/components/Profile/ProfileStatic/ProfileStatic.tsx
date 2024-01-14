import { ArrowRight } from '@mui/icons-material';
import {
  Box,
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Link
} from '@mui/material';

import Title from '@components/Title/Title';
import { UserRoles } from '@shared/enums';
import { AppRouter } from '@shared/enums/routes';
import './ProfileStatic.scss';

type ProfileStaticProps = {
  children: React.ReactNode;
  //TO-DO: check!
  userData: {
    role: string
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    telegramUsername?: string;
    photo?: string;
    id: string;
  };
};

const ProfileStatic = ({ children, userData }: ProfileStaticProps) => {
  console.log(userData); // TODO remove consolelog
  return (
    <Container component="main" maxWidth={false} className="profileContainer">
      <Title text="profile" />
      <Grid
        container
        spacing={2}
        sx={{
          marginBlock: '10px'
        }}
      >
        <Grid item sm={12} md={6}>
          {children}
        </Grid>
        <Grid item sm={12} md={6}>
          <Box
            className="profileStatic_flexAlignCenter"
            sx={{
              flexDirection: 'column',
              gap: '2rem'
            }}
          >
            <Box className="profileStaticText">
              <Typography component="div" variant="body1">
                Skills according to the projects is involved in:
              </Typography>
              <List>
                {/* //TO-DO: check! */}
                {['dummy one', 'dummy two', 'dummy three'].map(el => {
                  return (
                    <Box key={el} className="profileStatic_flexAlignCenter">
                      <ListItemIcon>
                        <ArrowRight />
                      </ListItemIcon>
                      <ListItem>
                        <ListItemText primary={el} />
                      </ListItem>
                    </Box>
                  );
                })}
              </List>
            </Box>
            <Box className="profileStaticText">
              <Typography component="div" variant="body1">
                Projects portfolio and the user&prime;s roles within them:
              </Typography>
              <List>
                {/* //TO-DO: check! */}
                {['dummy one', 'dummy two', 'dummy three'].map(el => {
                  return (
                    <Box key={el} className="profileStatic_flexAlignCenter">
                      <ListItemIcon>
                        <ArrowRight />
                      </ListItemIcon>
                      <ListItem>
                        <ListItemText primary={el} />
                      </ListItem>
                    </Box>
                  );
                })}
              </List>
            </Box>
            {userData.role === UserRoles.Admin && (
              <>
                <Box className="profileStaticText">
                  <Link href={AppRouter.PROFILE} variant="body2">
                    Comments left by mentors and admins
                  </Link>
                </Box>
                <Box className="profileStaticText">
                  <Link href={AppRouter.PROFILE} variant="body2">
                    Smart recruiters
                  </Link>
                </Box>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfileStatic;
