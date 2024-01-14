import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, Typography, Button, TextField } from '@mui/material';
import { useState, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@hooks';
import { confirmPassword } from '@store/adminPanel/users/operations';
import { resetAdminErrors, resetAdminState } from '@store/adminPanel/users/reducer';
import {
  selectAdminPanelUsersError,
  selectAdminPanelIsCorrectPassword
} from '@store/adminPanel/users/selectors';
import { selectAuthId } from '@store/auth/selectors';

import './ConfirmPassword.scss';

type ConfirmPasswordProps = {
  handleCloseModal: () => void;
  handleAction: () => void;
};

const ConfirmPassword: React.FC<ConfirmPasswordProps> = ({ handleCloseModal, handleAction }) => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectAuthId);
  const error = useAppSelector(selectAdminPanelUsersError);
  const isCorrectPassword = useAppSelector(selectAdminPanelIsCorrectPassword);

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSave = () => {
    if (userId !== null) {
      dispatch(confirmPassword({ id: userId, password }));
    }
  };

  useEffect(() => {
    dispatch(resetAdminErrors());
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      if (isCorrectPassword) {
        await handleAction();
        dispatch(resetAdminState());
        handleCloseModal();
      }
    })();
  }, [isCorrectPassword, handleAction, handleCloseModal, dispatch]);

  return (
    <Box>
      <Typography className="confirmPasswordTitle">
        Enter your current password to confirm changes
      </Typography>
      <Box mb={5} sx={{ position: 'relative' }}>
        <TextField
          sx={{
            width: '100%'
          }}
          className={error ? 'confirmPasswordError' : ''}
          type={showPassword ? 'text' : 'password'}
          onChange={e => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        {error && <span className="confirmPasswordErrorText">Enter your correct password</span>}
      </Box>
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
          onClick={handleSave}
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
  );
};

export default ConfirmPassword;
