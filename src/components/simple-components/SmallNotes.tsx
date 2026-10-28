import { characterDescriptionAtom } from './atoms';
import React from 'react';
import { TextFieldProps } from '@mui/material';
import { TextFieldVariants } from '@mui/material/TextField/TextField';
import { Notes } from '../notes';

export const SmallNotes = ({ ...restProps }: Omit<TextFieldProps, 'variant'> & { variant?: TextFieldVariants }) => {
  return <Notes rows={5} multiline {...restProps} atom={characterDescriptionAtom} />;
};
