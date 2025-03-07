import { Grid2 as Grid, Grid2Props, SxProps, TextFieldProps, Theme } from '@mui/material';
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

const getPlacementSx = (inputPlacement: InputPlacement): SxProps<Theme> => {
  return inputPlacement === 'left'
    ? {
        borderRadius: '0 4px  4px 0',
        borderLeft: 'none',
        textAlign: 'right',
        display: 'block',
      }
    : { borderRadius: '4px 0 0 4px', borderRight: 'none', textAlign: 'left', flexGrow: 1 };
};

export const NumberInputWrapper = ({
  size = 12,
  children,
  inputPlacement = 'left',
  NumberInputProps,
  ContainerProps,
}: InputWrapperProps) => {
  return (
    <Grid
      container
      alignItems={'center'}
      size={size}
      {...ContainerProps}
      sx={mergeSx({ transform: 'translateY(-2px)' }, ContainerProps?.sx || {})}
    >
      {inputPlacement === 'left' && <NumberInput {...NumberInputProps} />}
      <Grid size={'grow'} alignContent={'center'}>
        {children}
      </Grid>
      {inputPlacement === 'right' && <NumberInput {...NumberInputProps} />}
    </Grid>
  );
};
