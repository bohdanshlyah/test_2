import { Alert, AlertTitle, Button, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';

import SuccessDialog from '@components/AdminPanel/SuccessDialog/SuccessDialog';
import UrlInputField from '@components/AdminPanel/Users/EditUserProfile/UrlInputField';
import { useAppDispatch, useAppSelector } from '@hooks';
import { selectAdminPanelCheckedUsers } from '@store/adminPanel/users/selectors';
// import { updateUsersURLs } from '@store/user/operations';
import { resetUserErrors } from '@store/user/reducer';
import { selectUserError } from '@store/user/selectors';

interface EditUserUrlsProps {
  handleCloseModal: () => void;
}

const EditUserUrl: React.FC<EditUserUrlsProps> = ({ handleCloseModal }) => {
  const checkedUsers = useAppSelector(selectAdminPanelCheckedUsers);
  const selectedUser = checkedUsers[0];
  const userError = useAppSelector(selectUserError);
  const dispatch = useAppDispatch();

  const [urls, setUrls] = useState(selectedUser.urls);
  const [validUrls, setValidUrls] = useState(Array(5).fill(true));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);

  const handleUrlChange = (index: number, value: string, isValid: boolean) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);

    const newValidUrls = [...validUrls];
    newValidUrls[index] = isValid;
    setValidUrls(newValidUrls);
  };

  const handleSaveUrl = async () => {
    const allNonEmptyValid = urls.every((url, index) => url === '' || validUrls[index]);

    if (allNonEmptyValid) {
      const filteredUrls = urls.filter(url => url !== '' && url !== undefined);

      // Temporary logic, TODO: delete when endpoint works. Call dispatch instead.
      console.log(filteredUrls);
      setIsDialogOpen(true);

      // TODO Uncomment this logic when endpoint works.

      // const updatedUserInfo = await dispatch(
      //   updateUsersURLs({ userId: selectedUser.id, URLs: filteredUrls })
      // );

      // if (typeof updatedUserInfo.payload !== 'string') {
      //   setIsDialogOpen(true);
      // }
    }
  };

  useEffect(() => {
    setIsSaveButtonDisabled(validUrls.includes(false));
  }, [validUrls]);

  useEffect(() => {
    dispatch(resetUserErrors());
  }, [dispatch]);

  return (
    <Grid container>
      {userError && (
        <Alert severity="error">
          <AlertTitle>Editing urls error!</AlertTitle>
          {userError}
        </Alert>
      )}
      {Array.from({ length: 5 }).map((_, index) => (
        <Grid item xs={12} key={index}>
          <UrlInputField
            initialValue={urls[index] || ''}
            onURLChange={(value: string, isValid: boolean) =>
              handleUrlChange(index, value, isValid)
            }
          />
        </Grid>
      ))}
      <Grid item xs={12} container justifyContent="flex-end" spacing={2}>
        <Grid item>
          <Button variant="outlined" onClick={handleCloseModal}>
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveUrl}
            disabled={isSaveButtonDisabled}
          >
            Save
          </Button>
        </Grid>
      </Grid>
      <SuccessDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        message="User profile was successfully edited."
        handleCloseModal={handleCloseModal}
      />
    </Grid>
  );
};

export default EditUserUrl;
