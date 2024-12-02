import { Box, BoxProps, Grid2 as Grid } from '@mui/material';
import React from 'react';
import { GridProps } from '@mui/material/Grid';
import { MainContentColor } from '../../utils';

type PageContainerProps = GridProps & {
  children: React.ReactNode;
  BoxProps?: BoxProps;
};

export const PageContainer = ({ children, BoxProps, ...restProps }: PageContainerProps) => {
  return (
    <Box
      sx={{
        alignItems: 'center',
        minHeight: '100vh',
        display: 'flex',
        backgroundColor: MainContentColor,
      }}
      {...BoxProps}
    >
      <Grid container size={12} padding={2} {...restProps}>
        {children}
      </Grid>
    </Box>
  );
};
