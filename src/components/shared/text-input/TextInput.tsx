import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';

export const TextInput = ({ variant = 'filled', fullWidth = true, label, ...restProps }: TextFieldProps) => {
  return <TextField variant={variant} fullWidth={fullWidth} label={label} {...restProps} slotProps={{ input: { disableUnderline: true } }} />;
};
