import React from 'react';
import { Grid2 as Grid } from '@mui/material';
import { StyledPaper } from '../shared';
import { InventoryItem } from './InventoryItem';
import { InventoryHeader } from './InventoryHeader';
import { InventoryHeaderProps, InventoryListProps } from './types';

export const InventoryList = ({ nameDescription, inventoryItems }: InventoryHeaderProps & InventoryListProps) => {
  return (
    <Grid container size={12} component={StyledPaper} direction={'column'}>
      <InventoryHeader nameDescription={nameDescription} />
      {inventoryItems.map((item, index) => (
        <InventoryItem item={item} key={index} />
      ))}
    </Grid>
  );
};
