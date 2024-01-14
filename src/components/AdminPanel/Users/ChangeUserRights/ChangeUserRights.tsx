import { RadioGroup, Typography, Radio, FormControlLabel, Button, Box } from '@mui/material';
import { useState } from 'react';

import ConfirmPassword from '@components/AdminPanel/ConfirmPassword/ConfirmPassword';
import ModalUsers from '@components/AdminPanel/Users/ModalUsers/ModalUsers';
import { useAppDispatch, useAppSelector } from '@hooks';
import { UserRoles } from '@shared/enums';
import { User } from '@shared/interfaces';
import { updateUsersRights } from '@store/adminPanel/users/operations';
import { selectAdminPanelCheckedUsers } from '@store/adminPanel/users/selectors';

import './ChangeUserRights.scss';

type ChangeUserRightsProps = {
  handleCloseModal: () => void;
};

const ChangeUserRights: React.FC<ChangeUserRightsProps> = ({ handleCloseModal }) => {
  const dispatch = useAppDispatch();
  const checkedUsers = useAppSelector(selectAdminPanelCheckedUsers);
  const [save, setSave] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState('');
  const [isCorrectDomen, setIsCorrectDomen] = useState(true);
  const [modalUsers, setModalUsers] = useState<User[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxValue((event.target as HTMLInputElement).value);
    if (event.target.value === UserRoles.Admin || event.target.value === UserRoles.Manager) {
      const filteredUsers = checkedUsers.filter(user => !user.email.includes('@sigma.software'));
      if (filteredUsers.length) {
        setModalUsers(filteredUsers);
        setIsCorrectDomen(false);
      }
    }
  };

  const handleSaveRights = () => {
    setSave(prevState => !prevState);
  };

  const chooseAnotherType = () => {
    setIsCorrectDomen(true);
    setCheckboxValue('');
  };

  const handleAction = async () => {
    const id = checkedUsers.map(item => item.id);

    await dispatch(updateUsersRights({ role: checkboxValue, users: id }));
    handleSaveRights();
  };

  return (
    <>
      {save ? (
        <ConfirmPassword handleCloseModal={handleCloseModal} handleAction={handleAction} />
      ) : isCorrectDomen ? (
        <Box className="contentBox">
          <Typography
            mb={5}
            sx={{
              textAlign: 'center',
              fontSize: '22px',
              color: '#000'
            }}
          >
            Change users rights
          </Typography>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={checkboxValue}
            onChange={handleChange}
            sx={{
              gap: '10px'
            }}
          >
            <FormControlLabel
              className="formControlLabel"
              value={UserRoles.Admin}
              control={<Radio />}
              label="Admin"
            />
            <FormControlLabel
              className="formControlLabel"
              value={UserRoles.Manager}
              control={<Radio />}
              label="Manager"
            />
            <FormControlLabel
              className="formControlLabel"
              value={UserRoles.Mentor}
              control={<Radio />}
              label="Mentor"
            />
            <FormControlLabel
              className="formControlLabel"
              value={UserRoles.Mentee}
              control={<Radio />}
              label="Mentee"
            />
            <FormControlLabel
              className="formControlLabel"
              value="user with no assigned rights"
              control={<Radio />}
              label="User with no assigned rights"
            />
          </RadioGroup>
          <Box className="buttonBox">
            <Button
              onClick={handleCloseModal}
              type="button"
              variant="contained"
              sx={{
                backgroundColor: 'primary',
                width: '150px'
              }}
              size="large"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveRights}
              type="button"
              variant="contained"
              sx={{
                backgroundColor: 'primary',
                width: '150px'
              }}
              size="large"
            >
              Save
            </Button>
          </Box>
        </Box>
      ) : (
        <ModalUsers
          chooseAnotherType={chooseAnotherType}
          modalUsers={modalUsers}
          checkedUsers={checkedUsers}
          handleCloseModal={handleCloseModal}
          setSave={setSave}
        />
      )}
    </>
  );
};

export default ChangeUserRights;
