import avatarImg from '@assets/img/avatar.jpg';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRightAlt } from '@mui/icons-material';
import { Box, Button, Grid, Typography, Alert, AlertTitle, Link } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import InputTextField from '@components/InputTextField/InputTextField';
import PhotoUpload from '@components/PhotoUpload/PhotoUpload.tsx';
import { useAppDispatch, useAppSelector } from '@hooks';
import { validationSchema, ValidationSchema } from '@shared/validation/EditProfileSchema';
import { resetAuthErrors } from '@store/auth/reducer';
import { selectAuthError } from '@store/auth/selectors';
import preparePhotoDataUrl from '@utils/preparePhotoDataUrl';

import './ProfileForm.scss';

type ProfileFormProps = {
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

const ProfileForm = ({ userData, handleToggleEditMode }: ProfileFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      telegramUsername: userData.telegramUsername,
      photo: userData.photo || avatarImg
    }
  });

  const dispatch = useAppDispatch(); //TO-DO: check!
  const error = useAppSelector(selectAuthError); //TO-DO: check!
  const [avatar, setAvatar] = useState(userData.photo || avatarImg);

  const onSubmit: SubmitHandler<ValidationSchema> = async data => {
    let dataURL = '';
    let prefix = '';
    if (data.photo[0]) {
      [prefix, dataURL] = await preparePhotoDataUrl(data.photo[0], avatar);
    }

    // TO-DO:
    // remove consol
    console.log(prefix, dataURL);
    //add dispatch for edit userPage!
    // remove -->
    // dispatch();
    // signup({
    //   firstName: data.firstName,
    //   lastName: data.lastName,
    //   email: data.email,
    //   phoneNumber: data.phoneNumber,
    //   telegramUsername: data.telegramUsername,
    //   avatar: dataURL
    // })
    // <--
  };

  useEffect(() => {
    dispatch(resetAuthErrors());
  }, [dispatch]);

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="profileFormBox_flexColumn"
    >
      {error && (
        <Alert
          severity="error"
          sx={{
            marginBlock: 2
          }}
        >
          <AlertTitle>Edit error!</AlertTitle>
          {error}
        </Alert>
      )}
      <Grid container columnSpacing={2} rowSpacing={1}>
        <Grid item xs={12} sm={6}>
          <PhotoUpload
            avatar={avatar}
            setAvatar={setAvatar}
            name={'photo'}
            register={register}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box className="profileFormBox_flexColumn profileFormBox_flexAlignCenter">
            <Typography component="p" variant="body1" className="profileFormText">
              User ID: {userData.id}
            </Typography>
            <InputTextField name="firstName" label="First Name" control={control} />
            <InputTextField name="lastName" label="Last Name" control={control} />
          </Box>
        </Grid>
      </Grid>
      <Grid container>
        <InputTextField name="email" label="Email" control={control} />
        <InputTextField name="phoneNumber" label="Phone Number" control={control} />
        <InputTextField name="telegramUsername" label="TG Username" control={control} />
        <Link
          href="/change-password"
          underline="hover"
          variant="body2"
          className="profileFormBox_flexAlignCenter"
          sx={{
            padding: '10px',
            fontSize: '1.2rem'
          }}
        >
          Change password
          <ArrowRightAlt />
        </Link>
      </Grid>
      <Box
        className="profileFormBox_flexAlignCenter"
        sx={{
          gap: '5rem'
        }}
      >
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 4, mb: 2 }} size="large">
          Save changes
        </Button>
        <Button
          onClick={event => handleToggleEditMode(event)}
          type="button"
          fullWidth
          variant="contained"
          sx={{ mt: 4, mb: 2 }}
          size="large"
        >
          Discard changes
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileForm;
