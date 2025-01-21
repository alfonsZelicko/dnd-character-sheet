import { Grid2 as Grid, Grid2Props, TextFieldProps } from '@mui/material';
import React, { ReactNode } from 'react';
import { NumberInput } from '../index';
import { mergeSx } from '../../../utils';

export type InputPlacement = 'left' | 'right';

export type InputWrapperProps = Omit<Pick<Grid2Props, 'size'>, 'label'> & {
  children?: ReactNode;
  NumberInputProps?: TextFieldProps;
  inputPlacement?: InputPlacement;
  ContainerProps?: Grid2Props;
};

export const NumberInputWrapper = ({ size = 12, children, inputPlacement = 'left', NumberInputProps, ContainerProps }: InputWrapperProps) => {
  return (
    <Grid container alignItems={'center'} size={size} {...ContainerProps} sx={mergeSx({ transform: 'translateY(-2px)' }, ContainerProps?.sx || {})} >
      {inputPlacement === 'left' && <NumberInput {...NumberInputProps} />}
      <Grid size={'grow'}>{children}</Grid>
      {inputPlacement === 'right' && <NumberInput {...NumberInputProps} />}
    </Grid>
  );
};
