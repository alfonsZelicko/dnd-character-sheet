import { useAtom } from 'jotai';
import { sensesAtom } from './atoms';
import React from 'react';
import { TextFieldProps } from '@mui/material';
import { TextFieldVariants } from '@mui/material/TextField/TextField';
import { Notes } from '../notes';

export const SmallNotes = ({ ...restProps }: Omit<TextFieldProps, 'variant'> & { variant?: TextFieldVariants }) => {
  const [senses, setSenses] = useAtom(sensesAtom);
  return <Notes rows={5} placeholder="Some notes" multiline {...restProps} atom={sensesAtom} />;
};
