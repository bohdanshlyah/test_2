import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Title from '@components/Title/Title';
import { useAppDispatch, useAppSelector, useAuth } from '@hooks';
import { ValidationSchema, loginValidationSchema } from '@shared/validation/SignInSchema';
import { signin } from '@store/auth/operations';
import { resetAuthErrors } from '@store/auth/reducer';
import { selectAuthId, selectAuthError } from '@store/auth/selectors';
import { getUserById } from '@store/user/operations';
import { resetUserErrors } from '@store/user/reducer';
import { selectUserError } from '@store/user/selectors';
import './SignInForm.scss';

const SignInForm = () => {
  const dispatch = useAppDispatch();

  // store selectors
  const userId = useAppSelector(selectAuthId);

  // errors
  const userError = useAppSelector(selectUserError);
  const authError = useAppSelector(selectAuthError);

  const [showPassword, setShowPassword] = useState(false);
  const { token } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ValidationSchema>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<ValidationSchema> = async (data: ValidationSchema) => {
    await dispatch(signin({ email: data.email, password: data.password }));
  };

  const handleShowPassword = () => setShowPassword(showPassword => !showPassword);

  // reset first load errors
  useEffect(() => {
    dispatch(resetAuthErrors());
    dispatch(resetUserErrors());
  }, [dispatch]);

  // get user data
  useEffect(() => {
    if (userId && token) {
      dispatch(getUserById(userId));
    }
  }, [dispatch, token, userId]);

  return (
    <Container component="main" maxWidth={false} className="mainFormContainer">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Title text="sign in" />
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
          {authError ||
            (userError && (
              <Alert severity="error">
                <AlertTitle>Sign in error!</AlertTitle>
                {authError || userError}
              </Alert>
            ))}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                id="email"
                type="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          ></Controller>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" onClick={handleShowPassword} tabIndex={-1}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          ></Controller>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 4, mb: 2 }} size="large">
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignInForm;
