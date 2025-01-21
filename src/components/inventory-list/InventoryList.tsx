import React from 'react';
import { useAtomValue } from 'jotai/index';
import { InventoryAtomsAtom } from './atoms';
import { Grid2 as Grid } from '@mui/material';
import { StyledPaper } from '../shared';
import { InventoryItem } from './InventoryItem';

export const InventoryList = () => {
  const inventoryItems = useAtomValue(InventoryAtomsAtom);

  return (
    <Grid container size={12} component={StyledPaper} direction={'column'}>
      {inventoryItems.map((item, index) => (<InventoryItem item={item} key={index}/>))}
    </Grid>
  );
}