import { Typography, TypographyProps } from '@mui/material';
import React, { ReactNode } from 'react';

export type ComponentLabelProps = {
  children?: ReactNode;
  TypographyProps?: TypographyProps
};

const defaultTypographyProps: TypographyProps = {
  textTransform:'uppercase',
  variant:'h6',
  width:'100%',
  textAlign:'right',
  fontWeight:400
}

export const ComponentLabel  = ({children, TypographyProps}: ComponentLabelProps) =>
  <Typography  {...defaultTypographyProps} {...TypographyProps}>
    {children}
 </Typography>