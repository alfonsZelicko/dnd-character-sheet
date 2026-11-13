import { Typography, TypographyProps } from '@mui/material';
import React from 'react';
import { mergeSx } from '../../../utils';

const defaultTypographyProps: TypographyProps = {
  textTransform: 'uppercase',
  variant: 'h6',
  width: '100%',
  textAlign: 'right',
  fontWeight: 400,
  display: { sx: 'none', md: 'block' },
};

export const ComponentLabel = ({ children, ...restProps }: TypographyProps) => (
  <Typography {...defaultTypographyProps} {...restProps} sx={mergeSx(defaultTypographyProps.sx, restProps.sx)}>
    {children}
  </Typography>
);
