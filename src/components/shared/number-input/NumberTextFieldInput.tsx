import React from 'react';
import { styled, TextFieldProps } from '@mui/material';
import { NumberInputWrapper } from './NumberInputWrapper';
import { TextInput } from '../text-input';
import { NumberInputProps } from '../index';

const StyledTextFieldInput = styled(TextInput)({
  height: 40,
  marginTop: -5,
  '& .MuiInputBase-root': {
    borderLeft: 'none',
    borderBottomLeftRadius: '0',
    borderTopLeftRadius: '0',
  },
  '& input': {
    fontWeight: 400,
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
