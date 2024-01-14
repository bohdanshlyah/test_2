import {
  Box,
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import { Alert, AlertTitle, Snackbar } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { useAppSelector } from '@hooks';
import { User } from '@shared/interfaces';
import { addCheckedUser, removeCheckedUser } from '@store/adminPanel/users/reducer.ts';
import { selectUserData } from '@store/user/selectors.ts';
import './usersList.scss';

interface Props {
  checked: User[];
  users: User[];
}

const UsersList = ({ checked, users }: Props) => {
  const dispatch = useDispatch();
  const user = useAppSelector(selectUserData);
  const [open, setOpen] = useState(false);

  const handleToggle = (userItem: User) => () => {
    if (String(userItem.id) === String(user?.id)) {
      return;
    }
    let currentIndex = -1;
    checked.forEach((el, index) => {
      if (el.id === userItem.id) {
        currentIndex = index;
        return;
      }
    });
    currentIndex === -1
      ? dispatch(addCheckedUser(userItem))
      : dispatch(removeCheckedUser(userItem.id));

    if (checked.length >= 10) {
      setOpen(true);
      dispatch(removeCheckedUser(userItem.id));
    }
  };

  return (
    <>
      <Typography sx={{ mt: 3 }} variant="h5">
        Users:
      </Typography>
      <List sx={{ width: '100%' }}>
        {users && users.length > 0 ? (
          users.map(userItem => {
            const isChecked = checked.find(el => el.id === userItem.id);
            const labelId = `checkbox-list-label-${userItem.id}`;
            return (
              <Box key={userItem.id}>
                <ListItem disablePadding>
                  <ListItemButton role={undefined} onClick={handleToggle(userItem)} dense>
                    <ListItemIcon>
                      {String(userItem.id) !== String(user?.id) && (
                        <Checkbox
                          edge="start"
                          checked={!!isChecked}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      )}
                    </ListItemIcon>
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: '390px 290px 340px',
                        columnGap: '10px'
                      }}
                    >
                      <ListItemText id={labelId}>
                        <Link
                          className="usersLink"
                          to={`user/${userItem.id}`}
                          id={labelId}
                        >
                          {userItem.id}
                        </Link>
                      </ListItemText>
                      <ListItemText
                        id={labelId}
                      >
                        <Link
                          className="usersLink"
                          to={`user/${userItem.id}`}
                          id={labelId}
                        >
                          {userItem.firstName} {userItem.lastName}
                        </Link>
                      </ListItemText>
                      <ListItemText id={labelId}>
                        <Link
                          className="usersLink"
                          to={`user/${userItem.id}`}
                          id={labelId}
                        >
                          {`${userItem.email}`}
                        </Link>
                      </ListItemText>
                    </Box>
                  </ListItemButton>
                </ListItem>
                <Divider />
              </Box>
            );
          })
        ) : (
          <Typography>There is no users now</Typography>
        )}
      </List>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={6000}
      >
        <Alert severity="error">
          <AlertTitle> You can not choose more than 10 users profiles!</AlertTitle>
        </Alert>
      </Snackbar>
    </>
  );
};

export default UsersList;
