import { Typography, TypographyProps } from '@mui/material';
import React from 'react';

const defaultTypographyProps: TypographyProps = {
  textTransform: 'uppercase',
  variant: 'h6',
  width: '100%',
  textAlign: 'right',
  fontWeight: 400,
  display: 'none',
};

export const ComponentLabel = ({ children, ...restProps }: TypographyProps) => (
  <Typography {...defaultTypographyProps} {...restProps}>
    {children}
  </Typography>
);