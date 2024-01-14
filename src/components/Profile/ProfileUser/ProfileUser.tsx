import avatarImg from '@assets/img/avatar.jpg';
import { Box, Button, Grid, Card, CardMedia } from '@mui/material';

import ProfileTextField from '../ProfileTextField/ProfileTextField';
import './ProfileUser.scss';

type ProfileUserProps = {
  handleToggleEditMode: (event: React.MouseEvent<HTMLButtonElement>) => void;
  //TO-DO: check!
  userData: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    telegramUsername?: string;
    photo?: string;
    id: string;
  };
};

const ProfileUser = ({ userData, handleToggleEditMode }: ProfileUserProps) => {
  return (
    <Box component="div" className="profileUserBox">
      <Grid container columnSpacing={2} rowSpacing={1}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardMedia
              component="img"
              alt="avatar"
              src={userData.photo || avatarImg}
              height="auto"
              width="100%"
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            className="profileUserBox"
            sx={{
              alignItems: 'center'
            }}
          >
            <ProfileTextField title="user id" data={userData.id} />
            <ProfileTextField title="First name" data={userData.firstName} />
            <ProfileTextField title="last name" data={userData.lastName} />
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          gap: '1rem'
        }}
      >
        <ProfileTextField title="Email" data={userData.email} />
        <ProfileTextField title="Phone number" data={userData.phoneNumber || ''} />
        <ProfileTextField title="Telegram username" data={userData.telegramUsername || ''} />
      </Grid>
      <Button
        onClick={event => handleToggleEditMode(event)}
        type="button"
        variant="contained"
        sx={{ mt: 4, mb: 2 }}
        size="large"
      >
        Edit my profile
      </Button>
    </Box>
  );
};

export default ProfileUser;
