import React from 'react';
import { Grid2 as Grid } from '@mui/material';
import {
  BackpackAtomsAtom,
  CopperCoins,
  GoldCoins,
  InventoryList,
  MagicItem,
  QuickSlotAtomsAtom,
  SilverCoins,
  StyledLabel,
  StyledPaper,
} from '../../components';
import { useAtomValue } from 'jotai';

export const Inventory = () => {
  const backpackItems = useAtomValue(BackpackAtomsAtom);
  const quickSlotItems = useAtomValue(QuickSlotAtomsAtom);

  return (
    <Grid container size={12} spacing={1} alignItems="stretch">
      <Grid container size={4} direction={'column'}>
        <Grid container flexDirection={'row'} component={StyledPaper}>
          <Grid size={4}>
            <GoldCoins />
          </Grid>
          <Grid size={4}>
            <SilverCoins />
          </Grid>
          <Grid size={4}>
            <CopperCoins />
          </Grid>
          <Grid size={12}>
            <StyledLabel textAlign={'right'}>Moneyyy</StyledLabel>
          </Grid>
        </Grid>
        <InventoryList inventoryItems={backpackItems} nameDescription={'Backpack Inventory'} />
        <InventoryList inventoryItems={quickSlotItems} nameDescription={'Quick slots'} />
      </Grid>
      <Grid container size={3} direction="column" sx={{ alignSelf: 'stretch', justifyContent: 'space-between' }}>
        <MagicItem />
        <MagicItem />
        <MagicItem />
        <MagicItem />
        <MagicItem />
      </Grid>
    </Grid>
  );
};
