import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRightAlt, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Snackbar
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import InputTextField from '@components/InputTextField/InputTextField';
import Title from '@components/Title/Title';
import { useAppDispatch, useAppSelector } from '@hooks';
import {
  PasswordValidationSchema,
  passwordValidationSchema
} from '@shared/validation/PasswordSchema';
// import { signInUser } from '@store/auth/operations';
import { resetAuthErrors } from '@store/auth/reducer';
import { selectAuthError } from '@store/auth/selectors';

import './ChangePasswordForm.scss';

const ChangePasswordForm = () => {
  const {
    control,
    handleSubmit
    // formState: { errors }
  } = useForm<PasswordValidationSchema>({
    resolver: zodResolver(passwordValidationSchema)
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  const passwordError = useAppSelector(selectAuthError);

  const onSubmit: SubmitHandler<PasswordValidationSchema> = async data => {
    // TO-DO:
    // remove consol
    console.log(data);
    setSuccess(true);
    //add dispatch for edit password!
    // remove -->
    // dispatch(
    //   signup({
    //     password: data.password
    //   })
    // <--
  };

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetAuthErrors());
  }, [dispatch]);

  if (success) {
    setTimeout(() => {
      navigate('/profile');
    }, 1000);
    setOpen(true);
  }

  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(show => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth={false} className="changePasswordContainer">
      <Title text="change password" />
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          paddingBlock: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        {passwordError && (
          <Alert severity="error">
            <AlertTitle>Password error!</AlertTitle>
            {passwordError}
          </Alert>
        )}
        <InputTextField
          name="password"
          label="New password"
          control={control}
          type={showPassword ? 'text' : 'password'}
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
        <InputTextField
          name="confirmPassword"
          label="Confirm Password"
          control={control}
          type={showConfirmPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 4, mb: 2 }} size="large">
          Change password
        </Button>
        <Link
          href="/profile"
          underline="hover"
          variant="body2"
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '1rem'
          }}
        >
          Back to profile page
          <ArrowRightAlt />
        </Link>
        <Snackbar open={open} autoHideDuration={6000}>
          <Alert severity="success">
            <AlertTitle> Password was successfully changed!</AlertTitle>
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default ChangePasswordForm;
