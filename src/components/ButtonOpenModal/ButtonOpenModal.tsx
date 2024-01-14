import { Button } from '@mui/material';

type Props = {
  text: string;
  onClick: () => void;
};

const ButtonOpenModal = ({ text, onClick }: Props) => {
  return (
    <Button onClick={onClick} type="button" fullWidth variant="contained" sx={{ height: '100%' }}>
      {text}
    </Button>
  );
};

export default ButtonOpenModal;
