import './ProfileTextField.scss';
import { Typography } from '@mui/material';

type ProfileTextFieldProps = {
  title: string;
  data: string;
};

function ProfileTextField({ title, data }: ProfileTextFieldProps) {
  return (
    <Typography component="p" variant="body1" className="profileUserTextField">
      <span className="profileUserTitle">{title}:</span>
      <span>{data}</span>
    </Typography>
  );
}

export default ProfileTextField;
