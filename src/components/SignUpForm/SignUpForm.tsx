import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Alert,
  AlertTitle,
  Snackbar,
  Link
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import InputTextField from '@components/InputTextField/InputTextField';
import PhotoUpload from '@components/PhotoUpload/PhotoUpload.tsx';
import Title from '@components/Title/Title';
import { useAppDispatch, useAppSelector, useAuth } from '@hooks';
import { AppRouter } from '@shared/enums';
import { validationSchema, ValidationSchema } from '@shared/validation/SignUpSchema';
import { signup } from '@store/auth/operations';
import { resetAuthErrors } from '@store/auth/reducer';
import { selectAuthError, selectAuthId } from '@store/auth/selectors';
import { getUserById } from '@store/user/operations';
import { resetUserErrors } from '@store/user/reducer';
import { selectUserError } from '@store/user/selectors';
import preparePhotoDataUrl from '@utils/preparePhotoDataUrl.tsx';

import './SignUpForm.scss';
import { zodResolver } from '@hookform/resolvers/zod';

const FormSignUp = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema)
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // store selectors
  const userId = useAppSelector(selectAuthId);

  // errors
  const [error, setError] = useState<string | null>(null);
  const userError = useAppSelector(selectUserError);
  const authError = useAppSelector(selectAuthError);

  // local states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [open, setOpen] = useState(false);
  const { token } = useAuth();

  const onSubmit: SubmitHandler<ValidationSchema> = async data => {
    let dataURL = '';
    let prefix = '';
    if (data.photo[0]) {
      [prefix, dataURL] = await preparePhotoDataUrl(data.photo[0], avatar);
    }
    await dispatch(
      signup({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        telegramUsername: data.telegramUsername,
        avatar: {
          prefix: prefix,
          image: dataURL
        }
      })
    );
  };

  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(show => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // reset first load errors
  useEffect(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    dispatch(resetAuthErrors());
    dispatch(resetUserErrors());
  }, [dispatch]);

  // get user data
  useEffect(() => {
    if (userId && token) {
      setOpen(true);
      dispatch(getUserById(userId));
    }
  }, [dispatch, token, userId]);

  // set auth error
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  // set user error
  useEffect(() => {
    if (userError && token) {
      setError(userError);
      setTimeout(() => {
        dispatch(resetUserErrors());
        navigate('/signin');
      }, 2000);
    }
  }, [dispatch, navigate, token, userError]);

  return (
    <Container component="main" maxWidth={false} className="formContainer">
      <Title text="sign up" />
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          {error && (
            <Alert severity="error">
              <AlertTitle>Sign up error!</AlertTitle>
              {error}
            </Alert>
          )}
          <Grid item xs={12} sm={6} p={0}>
            <PhotoUpload
              avatar={avatar}
              setAvatar={setAvatar}
              name={'photo'}
              register={register}
              errors={errors}
            />
          </Grid>
          <Grid container columnSpacing={2} rowSpacing={1}>
            <Grid item xs={12} sm={6} p={0}>
              <InputTextField name="firstName" label="First Name *" control={control} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputTextField name="lastName" label="Last Name *" control={control} />
            </Grid>
            <Grid item xs={12}>
              <InputTextField name="email" label="Email *" control={control} />
            </Grid>
            <Grid item xs={12}>
              <InputTextField name="phoneNumber" label="Phone Number" control={control} />
            </Grid>
            <Grid item xs={12}>
              <InputTextField name="telegramUsername" label="TG Username" control={control} />
            </Grid>
            <Grid item xs={12}>
              <InputTextField
                name="password"
                label="Password *"
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
            </Grid>
            <Grid item xs={12}>
              <InputTextField
                name="confirmPassword"
                label="Confirm Password *"
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
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 4, mb: 2 }} size="large">
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href={AppRouter.SIGN_IN} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Box py={2}>
          <Snackbar open={open} autoHideDuration={6000}>
            <Alert severity="success">
              <AlertTitle> Your profile was successfully created!</AlertTitle>
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </Container>
  );
};
export default FormSignUp;
