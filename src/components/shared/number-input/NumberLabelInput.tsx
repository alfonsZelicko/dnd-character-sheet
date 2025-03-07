import React from 'react';
import { InputPlacement, NumberInputWrapper } from './NumberInputWrapper';
import { NumberLabelInputProps } from './types';
import { StyledLabel } from '../text-input';
import { dottedBorder, mergeSx } from '../../../utils';
import { SxProps, Theme } from '@mui/material';

const getPlacementSx = (inputPlacement: InputPlacement): SxProps<Theme> => {
  return inputPlacement === 'left'
    ? {
        borderRadius: '0 4px  4px 0',
        borderLeft: 'none',
        display: 'block',
      }
    : { borderRadius: '4px 0 0 4px', borderRight: 'none', flexGrow: 1 };
};

export const NumberLabelInput = ({
  NumberInputProps,
  StyledLabelProps,
  label,
  size,
  inputPlacement = 'left',
}: NumberLabelInputProps) => (
  <NumberInputWrapper size={size} inputPlacement={inputPlacement} NumberInputProps={{ ...NumberInputProps }}>
    <StyledLabel
      variant={'body1'}
      {...StyledLabelProps}
      sx={mergeSx(
        getPlacementSx(inputPlacement),
        { textAlign: inputPlacement, border: dottedBorder, height: '3rem', padding: '6px' },
        StyledLabelProps?.sx ? StyledLabelProps?.sx : {}
      )}
    >
      {label}
    </StyledLabel>
  </NumberInputWrapper>
);
