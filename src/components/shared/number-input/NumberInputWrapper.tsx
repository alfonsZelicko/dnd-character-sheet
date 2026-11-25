import { Grid2 as Grid } from '@mui/material';
import React from 'react';
import { NumberInput } from '../index';
import { mergeSx } from '../../../utils';
import { InputWrapperProps } from './types';

export const NumberInputWrapper = ({
  size = 12,
  children,
  inputPlacement = 'left',
  NumberInputProps,
  ContainerProps,
}: InputWrapperProps) => (
  <Grid
    container
    alignItems="center"
    size={size}
    {...ContainerProps}
    sx={mergeSx({ transform: 'translateY(-2px)' }, ContainerProps?.sx || {})}
  >
    {inputPlacement === 'left' && <NumberInput {...NumberInputProps} />}
    <Grid size="grow" alignContent="center">
      {children}
    </Grid>
    {inputPlacement === 'right' && <NumberInput {...NumberInputProps} />}
  </Grid>
);
