import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import MuiModal from '@mui/material/Modal';

import ChangeUserRights from '@components/AdminPanel/Users/ChangeUserRights/ChangeUserRights';
import EditUserUrl from '@components/AdminPanel/Users/EditUserProfile/EditUserUrl';

import './Modal.scss';

interface ModalProps {
  selectedButton: string;
  openModal: boolean;
  handleCloseModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ selectedButton, openModal, handleCloseModal }) => {
  const renderComponent: Record<string, JSX.Element> = {
    'Create user profile': <div>компонент створення профілю користувача</div>,
    'Edit user profile': <EditUserUrl handleCloseModal={handleCloseModal} />,
    'Change users rights': <ChangeUserRights handleCloseModal={handleCloseModal} />,
    'Remove user profile': <div>компонент для видалення профілю користувача</div>
  };

  return (
    <>
      <MuiModal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box className="modalBox">
          <CloseIcon
            onClick={handleCloseModal}
            fontSize="medium"
            sx={{
              position: 'absolute',
              top: '10px',
              right: '15px',
              cursor: 'pointer'
            }}
          />
          {renderComponent[selectedButton]}
        </Box>
      </MuiModal>
    </>
  );
};

export default Modal;
