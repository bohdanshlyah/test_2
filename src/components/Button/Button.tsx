import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { ReactNode, FC } from 'react';

interface ButtonProps extends MuiButtonProps {
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return <MuiButton {...props}>{children}</MuiButton>;
};

export default Button;
