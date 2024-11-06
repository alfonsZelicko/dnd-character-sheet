import { Grid2 as Grid, Grid2Props, TextFieldProps } from '@mui/material';
import React, { ReactNode } from 'react';
import { NumberInput } from '../index';

export type InputPlacement = 'left' | 'right';

export type InputWrapperProps = Omit<Pick<Grid2Props, 'size'>, 'label'> & {
  children?: ReactNode;
  NumberInputProps?: TextFieldProps;
  inputPlacement?: InputPlacement;
};

export const NumberInputWrapper = ({ size = 12, children, inputPlacement = 'left', NumberInputProps }: InputWrapperProps) => {
  return (
    <Grid container alignItems={'center'} size={size}>
      {inputPlacement === 'left' && <NumberInput {...NumberInputProps} />}
      <Grid size={'grow'}>{children}</Grid>
      {inputPlacement === 'right' && <NumberInput {...NumberInputProps} />}
    </Grid>
  );
};
