import { Grid2 as Grid, Paper } from '@mui/material';
import React from 'react';
import { GridProps } from '@mui/material/Grid';

export const HalfPageContainer = ({ children, ...restProps }: GridProps) => {
  return (
    <Grid
      container
      size={{ xs: 12 }}
      spacing={2}
      component={Paper}
      sx={{ p: 2, m: 2, boxShadow: '0 0 10px rgba(0,0,0,0.3)' }}
      {...restProps}
    >
      <Grid container>{children}</Grid>
    </Grid>
  );
};
