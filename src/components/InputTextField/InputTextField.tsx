import { TextField } from '@mui/material';
import { Controller, FieldValues, FieldPath, Control } from 'react-hook-form';

export type InputTextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
  control?: Control<TFieldValues>
  label: string | JSX.Element
  type?: string
  defaultValue?: string | any
  InputProps?: {
    endAdornment?: JSX.Element;
  };
}

const InputTextField = <
TFieldValues extends FieldValues = FieldValues,
TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    name,
    control,
    label,
    defaultValue = '',
    ...props
  }: InputTextFieldProps<TFieldValues, TName>) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <TextField
          fullWidth
          inputRef={ref}
          label={label}
          variant="outlined"
          margin="normal"
          value={value}
          onChange={onChange}
          error={!!error}
          helperText={error ? error.message : null}
          {...props}
        />
      )}
    />
  );
};

export default InputTextField;

