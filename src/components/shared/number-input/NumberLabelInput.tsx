import { Grid2Props, styled, SxProps, Theme, Typography, TypographyProps } from '@mui/material';
import { dottedBorder } from '../../../utils';
import React, { ReactNode } from 'react';
import { InputPlacement, NumberInputWrapper } from './NumberInputWrapper';
import { NumberInputProps } from '../index';

const StyledLabel = styled(Typography)({
  marginTop: '1px',
  padding: '4px 4px 0 4px',
  lineHeight: '1rem',
  border: dottedBorder,
  fontWeight: 400,
  textTransform: 'uppercase',
  height: '45px',
});

const getPlacementSx = (inputPlacement: InputPlacement): SxProps<Theme> => {
  return inputPlacement === 'left'
    ? { borderRadius: '0 4px  4px 0', borderLeft: 'none', textAlign: 'right' }
    : {
        borderRadius: '4px 0 0 4px',
        borderRight: 'none',
        textAlign: 'left',
      };
};

export type NumberLabelInputProps = Pick<Grid2Props, 'size'> & {
  NumberInputProps?: NumberInputProps;
  StyledLabelProps?: TypographyProps;
  label: ReactNode;
  inputPlacement?: InputPlacement;
};

export const NumberLabelInput = ({ NumberInputProps, StyledLabelProps, label, size, inputPlacement = 'left' }: NumberLabelInputProps) => (
  <NumberInputWrapper size={size} inputPlacement={inputPlacement} NumberInputProps={{ ...NumberInputProps, label }}>
    <StyledLabel variant={'body1'} {...StyledLabelProps} sx={getPlacementSx(inputPlacement)}>
      {label}
    </StyledLabel>
  </NumberInputWrapper>
);
