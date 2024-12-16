import { Box, BoxProps, Grid2 as Grid, Grid2Props } from '@mui/material';
import React, { forwardRef } from 'react';
import { imageBackgroundSx, mainPageContainerSx } from './styles';
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
    <Box sx={mergeSx(mainPageContainerSx, imageBackgroundSx)} {...BoxProps} ref={ref}>
      <Grid container size={12} padding={0} {...restProps}>
        {children}
      </Grid>
    </Box>
  );
});
