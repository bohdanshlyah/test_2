import { TextField } from '@mui/material';
import React, { useState } from 'react';

type UrlInputFieldProps = {
  initialValue: string;
  onURLChange: (value: string, isValid: boolean) => void;
};

const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

const UrlInputField: React.FC<UrlInputFieldProps> = ({ initialValue, onURLChange }) => {
  const [url, setUrl] = useState(initialValue);
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    const valid = value === '' || urlRegex.test(value);
    setIsValid(valid);
    onURLChange(value, valid);
  };  

  return (
    <TextField
      type="text"
      value={url}
      onChange={handleChange}
      error={!isValid}
      helperText={!isValid ? 'Enter a valid URL' : 'Enter the URL'}
      fullWidth
      margin="normal"
      variant="outlined"
    />
  );
};

export default UrlInputField;
