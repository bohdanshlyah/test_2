import { Box, Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import SearchBar from '@components/AdminPanel/SearchBar/SearchBar.tsx';
import UsersList from '@components/AdminPanel/Users/UsersList.tsx';
import Modal from '@components/Modal/Modal';
import TitleSmall from '@components/Title/Title.tsx';
import { useAppSelector } from '@hooks';
import { AppDispatch } from '@store';
import { getAllUsers, getUsersByIdAndEmail } from '@store/adminPanel/users/operations.ts';
import {
  selectAdminPanelUsersData,
  selectAdminPanelCheckedUsers
} from '@store/adminPanel/users/selectors.ts';

const UsersComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState('');
  const checked = useAppSelector(selectAdminPanelCheckedUsers);
  // const [page, setPage] = useState(1); // TODO fix page after load data from backend
  const users = useAppSelector(selectAdminPanelUsersData);
  const [openModal, setOpenModal] = useState(false);
  const [selectedButton, setSelectedButton] = useState('');

  const handleOpenModal = (text: string) => {
    setSelectedButton(text);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSearch = async () => {
    console.log('Search');
    await dispatch(getUsersByIdAndEmail(searchQuery));
  };

  useEffect(() => {
    dispatch(getAllUsers(1));
  }, [dispatch]);

  return (
    <>
      <TitleSmall text="Users" varian="h4" />
      <Grid container spacing={2} sx={{ marginTop: '16px' }}>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ height: '100%' }}
            onClick={() => handleOpenModal('Create user profile')}
          >
            Create user profile
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ height: '100%' }}
            disabled={checked.length !== 1}
            onClick={() => handleOpenModal('Edit user profile')}
          >
            Edit user profile
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ height: '100%' }}
            disabled={checked.length < 1}
            onClick={() => handleOpenModal('Change users rights')}
          >
            Change users rights
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ height: '100%' }}
            disabled={checked.length < 1}
            onClick={() => handleOpenModal('Remove user profile')}
          >
            Remove user profile
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <SearchBar
          setSearchQuery={setSearchQuery}
          searchBarText="Search users by id or email"
          onSubmit={handleSearch}
        />
      </Box>
      <UsersList users={users} checked={checked} />
      {openModal && (
        <Modal
          selectedButton={selectedButton}
          openModal={openModal}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};

export default UsersComponent;
