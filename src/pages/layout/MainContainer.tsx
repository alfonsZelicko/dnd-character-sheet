import React, { ReactNode } from 'react';
import { Grid2 as Grid } from '@mui/material';

export const MainContainer = ({ children }: { children: ReactNode }) => (
  <Grid container sx={{ height: '100vh', width: '100vw', background: 'gray' }} spacing={2}>
    <Grid container sx={{ m: 2 }}>
      {children}
    </Grid>
  </Grid>
);
