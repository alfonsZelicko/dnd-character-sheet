import { BoxProps, TooltipProps } from '@mui/material';
import { ReactNode } from 'react';

export type OverflowTooltipProps = Omit<TooltipProps, 'title' | 'children'> & {
  BoxProps?: BoxProps;
  children: ReactNode;
  maxWidth?: number;
  title?: ReactNode;
};
