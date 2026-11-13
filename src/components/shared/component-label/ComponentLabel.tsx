import { Typography, TypographyProps } from '@mui/material';
import React from 'react';
import { mergeSx } from '../../../utils';

const defaultTypographyProps: TypographyProps = {
  textTransform: 'uppercase',
  variant: 'h6',
  textAlign: 'right',
};

export const ComponentLabel = ({ children, ...restProps }: TypographyProps) => (
  <Typography
    {...defaultTypographyProps}
    {...restProps}
    sx={mergeSx({ display: { xs: 'none', md: 'block' }, fontWeight: 400, width: '100%' }, restProps.sx)}
  >
    {children}
  </Typography>
);
