import React from 'react';
import { InventoryItemProps } from './types';
import { useAtom } from 'jotai';
import { Grid2 as Grid } from '@mui/material';

export const InventoryItem = ({ item }: InventoryItemProps) => {
  const [{name, quantity}] = useAtom(item);

  return <Grid container size={12}>
    <Grid size={'grow'}>{name}</Grid>
    <Grid width={'20px'}>{quantity}</Grid>
  </Grid>
}