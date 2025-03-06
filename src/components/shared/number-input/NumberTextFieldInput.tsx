import React from 'react';
import { styled, TextFieldProps } from '@mui/material';
import { NumberInputWrapper } from './NumberInputWrapper';
import { TextInput } from '../text-input';
import { NumberInputProps } from './types';

const StyledTextFieldInput = styled(TextInput)({
  height: '3rem',
  '& .MuiInputBase-root': {
    borderLeft: 'none',
    borderBottomLeftRadius: '0',
    borderTopLeftRadius: '0',
  },
  '& input': {
    fontWeight: 400,
    fontSize: '1.5rem',
    lineHeight: 1.5,
  },
});

export type NumberTextFieldInputProps = {
  NumberInputProps?: NumberInputProps;
  TextFieldProps: TextFieldProps;
};

export const NumberTextFieldInput = ({ NumberInputProps, TextFieldProps }: NumberTextFieldInputProps) => (
  <NumberInputWrapper {...{ NumberInputProps: NumberInputProps }}>
    <StyledTextFieldInput variant={'filled'} {...TextFieldProps} />
  </NumberInputWrapper>
);
