import React from 'react';
import { Grid2 as Grid } from '@mui/material';
import { InventoryList } from '../../components/inventory-list';
import { useAtomValue } from 'jotai/index';
import { BackpackAtomsAtom, QuickSlotAtomsAtom } from '../../components/inventory-list/atoms';
import { NumberLabelInput, StyledLabel, StyledPaper } from '../../components';

export const Inventory = () => {
  const backpackItems = useAtomValue(BackpackAtomsAtom);
  const quickSlotItems = useAtomValue(QuickSlotAtomsAtom);

  return (
    <Grid container size={12} spacing={1}>
      <Grid container size={4} direction={'column'}>
        <Grid container flexDirection={'row'} component={StyledPaper}>
          <Grid size={4}>
            <NumberLabelInput label={'Gold coins'} NumberInputProps={{ sx: { width: '80px' } }} />
          </Grid>
          <Grid size={4}>
            <NumberLabelInput label={'Silver coins'} NumberInputProps={{ sx: { width: '80px' } }} />
          </Grid>
          <Grid size={4}>
            <NumberLabelInput label={'Copper coins'} NumberInputProps={{ sx: { width: '80px' } }} />
          </Grid>
          <Grid size={12}>
            <StyledLabel textAlign={'right'}>Moneyyy</StyledLabel>
          </Grid>
        </Grid>
        <InventoryList inventoryItems={backpackItems} nameDescription={'Backpack Inventory'} />
        <InventoryList inventoryItems={quickSlotItems} nameDescription={'Quick slots'} />
      </Grid>
    </Grid>
  );
};
