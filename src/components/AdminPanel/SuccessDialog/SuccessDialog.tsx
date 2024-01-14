import { Dialog, DialogActions, DialogContent, DialogContentText, Button } from '@mui/material';
import React from 'react';

interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
  message: string;
  handleCloseModal: () => void;
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({
  open,
  onClose,
  message,
  handleCloseModal
}) => {
  const handleButtonClick = () => {
    onClose();
    handleCloseModal();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleButtonClick();
          }}
          color="primary"
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessDialog;
