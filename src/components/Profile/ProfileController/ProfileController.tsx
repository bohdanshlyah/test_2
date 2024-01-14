import { useState } from 'react';

import ProfileForm from '@components/Profile/ProfileForm/ProfileForm';
import ProfileStatic from '@components/Profile/ProfileStatic/ProfileStatic';
import ProfileUser from '@components/Profile/ProfileUser/ProfileUser';
import { useAppSelector } from '@hooks';
import { selectUserData } from '@store/user/selectors';

const ProfileController = () => {
  // add
  const userData = useAppSelector(selectUserData);

  // const userData = {
  //   firstName: 'my first name',
  //   lastName: 'my last name',
  //   email: 'test@test.ua',
  //   phoneNumber: '0123456789',
  //   telegramUsername: '@MyTelegram',
  //   photo: avatarImg,
  //   id: 'ID_123123'
  // };

  const [isEditMode, setIsEditMode] = useState(false);

  const handleToggleEditMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsEditMode(prev => !prev);
  };

  if (!userData) return null;

  return (
    <ProfileStatic userData={userData}>
      {isEditMode ? (
        <ProfileForm handleToggleEditMode={handleToggleEditMode} userData={userData} />
      ) : (
        <ProfileUser handleToggleEditMode={handleToggleEditMode} userData={userData} />
      )}
    </ProfileStatic>
  );
};

export default ProfileController;
