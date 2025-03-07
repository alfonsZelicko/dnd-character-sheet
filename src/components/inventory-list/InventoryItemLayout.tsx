import { InventoryItemLayoutProps } from './types';
import React from 'react';
import { Grid2 as Grid } from '@mui/material';

export const InventoryItemLayout = ({ itemInput, countInput }: InventoryItemLayoutProps) => (
  <Grid container size={12}>
    <Grid size={'grow'}>{itemInput}</Grid>
    <Grid width={'20px'} marginLeft={1}>
      {countInput}
    </Grid>
  </Grid>
);
