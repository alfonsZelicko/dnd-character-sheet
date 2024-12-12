import { Box, BoxProps, Grid2 as Grid, Grid2Props } from '@mui/material';
import React, { forwardRef } from 'react';

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
      sx={{
        alignItems: 'center',
        minHeight: 'calc(100vh - 49px)',
        width: '100%',
        display: 'flex',
        backgroundColor: 'transparent',
      }}
      {...BoxProps}
      ref={ref}
    >
      <Grid container size={12} padding={2} {...restProps}>
        {children}
      </Grid>
    </Box>
  );
});
