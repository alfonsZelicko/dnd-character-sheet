import { Box, BoxProps, Grid2Props } from '@mui/material';
import React, { forwardRef } from 'react';
import { mergeSx } from '../../utils';

type PageContainerProps = Grid2Props & {
  children: React.ReactNode;
  BoxProps?: BoxProps;
};

export const PageContainer = forwardRef<HTMLDivElement, PageContainerProps>(function PageContainer(
  { children, BoxProps, ...restProps }: PageContainerProps,
  ref
) {
  return (
    <Box
      {...BoxProps}
      sx={mergeSx(BoxProps?.sx ? BoxProps.sx : {}, {
        alignItems: 'center',
        minHeight: 'calc(100vh - 49px)',
        width: '100%',
        display: 'flex',
        backgroundColor: 'transparent',
        padding: 2,
      })}
      ref={ref}
    >
      {children}
    </Box>
  );
});
