import {
  Button,
  Box,
  Checkbox,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useState, Dispatch, SetStateAction, useEffect } from 'react';

import { useAppDispatch } from '@hooks';
import { User } from '@shared/interfaces';
import { addCheckedUser, removeCheckedUser } from '@store/adminPanel/users/reducer';

import './ModalUsers.scss';

type ModalUsersProps = {
  chooseAnotherType: () => void;
  handleCloseModal: () => void;
  checkedUsers: User[];
  modalUsers: User[];
  setSave: Dispatch<SetStateAction<boolean>>;
};

const ModalUsers: React.FC<ModalUsersProps> = ({
  chooseAnotherType,
  handleCloseModal,
  modalUsers,
  checkedUsers,
  setSave
}) => {
  const dispatch = useAppDispatch();
  const [checkedModalUsers, setCheckedModalUsers] = useState(modalUsers);

  const isUserChecked = (user: User): boolean => {
    return checkedUsers.some(checkedUser => checkedUser.id === user.id);
  };

  const handleToggleUsers = (user: User) => {
    const isChecked = isUserChecked(user);
    if (isChecked) {
      const updatedCheckedModalUsers = checkedModalUsers.filter(
        checkedUser => checkedUser.id !== user.id
      );
      setCheckedModalUsers(updatedCheckedModalUsers);
      dispatch(removeCheckedUser(user.id));
    } else {
      const updatedCheckedModalUsers = [...checkedModalUsers, user];
      setCheckedModalUsers(updatedCheckedModalUsers);
      dispatch(addCheckedUser(user));
    }
  };

  useEffect(() => {
    if (checkedModalUsers.length < 1 && checkedUsers.length >= 1) setSave(true);
    if (!checkedUsers.length) handleCloseModal();
  }, [checkedModalUsers, checkedUsers, setSave, handleCloseModal]);

  return (
    <Box className="modalUsersBox">
      <Typography
        mb={3}
        sx={{
          textAlign: 'center',
          fontSize: '22px',
          color: '#000'
        }}
      >
        You can not assign rights of admin or manager to this users.
      </Typography>
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto'
        }}
      >
        {modalUsers.map(user => (
          <ListItem
            key={user.id}
            sx={{
              padding: '0'
            }}
          >
            <ListItemButton role={undefined} onClick={() => handleToggleUsers(user)} dense>
              <ListItemIcon
                sx={{
                  minWidth: '0'
                }}
              >
                <Checkbox edge="start" checked={isUserChecked(user)} disableRipple />
              </ListItemIcon>
              <ListItemText className="modalUsersText" primary={`${user.email}`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box className="buttonBox" sx={{ marginTop: 'auto' }}>
        <Button
          className="modalButon"
          onClick={handleCloseModal}
          type="button"
          variant="contained"
          sx={{
            backgroundColor: 'primary'
          }}
          size="large"
        >
          Cancel
        </Button>
        <Button
          className="modalButon modalButonSave"
          type="button"
          variant="contained"
          sx={{
            backgroundColor: 'primary'
          }}
          size="large"
          onClick={chooseAnotherType}
        >
          Choose another type
        </Button>
      </Box>
    </Box>
  );
};

export default ModalUsers;
