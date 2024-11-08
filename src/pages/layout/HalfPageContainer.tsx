import { Grid2 as Grid, Paper } from '@mui/material';
import React from 'react';
import { GridProps } from '@mui/material/Grid';

export const HalfPageContainer = ({ children, ...restProps }: GridProps) => {
  return (
    <Grid container alignItems={'flex-start'} size={{ xs: 12, lg: 6 }} spacing={2} component={Paper} sx={{ p: 2 }} {...restProps}>
      <Grid container>{children}</Grid>
    </Grid>
  );
};
