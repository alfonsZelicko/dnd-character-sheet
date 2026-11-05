import React from 'react';
import { Grid2 as Grid } from '@mui/material';
import { Creatures } from '../../components/creatures';

export const CreaturesPage = () => (
  <Grid container size={12} spacing={1} alignItems="stretch">
    <Creatures />
  </Grid>
);
