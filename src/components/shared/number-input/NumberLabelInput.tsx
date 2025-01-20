import { SxProps, Theme } from '@mui/material';
import React from 'react';
import { InputPlacement, NumberInputWrapper } from './NumberInputWrapper';
import { NumberLabelInputProps } from './types';
import { StyledLabel } from '../text-input';

const getPlacementSx = (inputPlacement: InputPlacement): SxProps<Theme> => {
  return inputPlacement === 'left'
    ? {
        borderRadius: '0 4px  4px 0',
        borderLeft: 'none',
        textAlign: 'right',
        display: 'block',
        maxHeight: '3.0em',
      }
    : { borderRadius: '4px 0 0 4px', borderRight: 'none', textAlign: 'left', flexGrow: 1 };
};

export const NumberLabelInput = ({
  NumberInputProps,
  StyledLabelProps,
  label,
  size,
  inputPlacement = 'left',
}: NumberLabelInputProps) => (
  <NumberInputWrapper
    size={size}
    inputPlacement={inputPlacement}
    NumberInputProps={{ ...NumberInputProps }}
  >
    <StyledLabel variant={'body1'} {...StyledLabelProps} sx={getPlacementSx(inputPlacement)}>
      {label}
    </StyledLabel>
  </NumberInputWrapper>
);
