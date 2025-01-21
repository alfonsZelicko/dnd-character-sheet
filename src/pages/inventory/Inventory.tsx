import React from 'react';
import { Grid2 as Grid } from '@mui/material';
import { InventoryList } from '../../components/inventory-list';

export const Inventory = () => {
  return (
    <Grid container size={12} spacing={1}>
      <Grid container size={6} sx={{width: '50vw'}} className={'hovno'}>
        <InventoryList />
      </Grid>
    </Grid>
  );
};
