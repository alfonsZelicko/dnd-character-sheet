import { Box, Button, styled, TextField, TextFieldProps } from '@mui/material';
import React from 'react';

const StyledTextField = styled(TextField)({
  width: '50px',
  height: '50px',
  border: '1.5px solid #846e5485',
  borderRadius: '0',
  boxShadow: '0 0 2px rgba(0,0,0,0.1)',
  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
    display: 'none',
  },
  '& input[type=number]': {
    MozAppearance: 'textfield',
  },
  '& input': {
    textAlign: 'center',
    paddingLeft: '0',
    paddingRight: '0',
    lineHeight: 1.5,
  },
});

const StyledButton = styled(Button)({});

export type NumberInputProps = Omit<TextFieldProps, 'variant'> & { showIncButtons?: boolean };

export const NumberInput = ({ showIncButtons = false, label, ...restProps }: NumberInputProps) =>
  showIncButtons ? (
    <Box sx={{ display: 'inline-block', position: 'relative' }}>
      <StyledTextField {...{ variant: 'outlined', hiddenLabel: true, type: 'number', ...restProps }} />
      <Box
        style={{
          position: 'absolute',
          top: 0,
          right: '-30px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '2px 4px',
        }}
      >
        <StyledButton>HHH</StyledButton>
      </Box>
    </Box>
  ) : (
    <StyledTextField {...{ variant: 'outlined', hiddenLabel: true, type: 'number', ...restProps }} />
  );

const StyledNumberField = styled(TextField)({
  mr: 2,
  input: { textAlign: 'center', fontSize: '1.3rem', paddingTop: '4px !important', paddingBottom: '0 !important', marginTop: '5px' },
  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
    display: 'none',
  },
});

const InputCommonProps = { size: 'small' as 'small', variant: 'standard' as 'standard', type: 'number' };

export const StandardNumberInput = ({ ...restProps }: TextFieldProps) => {
  return <StyledNumberField {...InputCommonProps} {...restProps} />;
};
