import React from 'react';
import { Grid2 as Grid } from '@mui/material';
import {
  ArmorInventory,
  BackpackAtomsAtom,
  Coins,
  InventoryList,
  MagicItemAtomsAtom,
  MagicItems,
  QuickSlotAtomsAtom,
  WeaponInventory,
} from '../../components';
import { useAtomValue } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { Notes } from '../../components/notes';

const InventoryNotesAtom = atomWithStorage<string>('inventory-notes', '', undefined, { getOnInit: true });

export const Inventory = () => {
  const backpackItems = useAtomValue(BackpackAtomsAtom);
  const quickSlotItems = useAtomValue(QuickSlotAtomsAtom);
  const magicItems = useAtomValue(MagicItemAtomsAtom);

  return (
    <Grid container size={12} spacing={1} alignItems="stretch">
      {/* coins/inventory list section*/}
      <Grid
        container
        size={{ xs: 12, md: 4 }}
        direction="column"
        sx={{ justifyContent: 'space-between', height: 'auto' }}
      >
        <Coins />
        <InventoryList inventoryItems={backpackItems} nameDescription={'Backpack Inventory'} />
        <InventoryList inventoryItems={quickSlotItems} nameDescription={'Quick slots'} />
      </Grid>
      {/* magic items section */}
      <Grid
        container
        size={{ xs: 12, md: 3 }}
        direction="column"
        sx={{ alignSelf: 'stretch', justifyContent: 'space-between' }}
      >
        <MagicItems magicItems={magicItems} />
      </Grid>
      {/* weapons/armor/notes section*/}
      <Grid
        container
        size={{ xs: 12, md: 5 }}
        direction="column"
        wrap="nowrap"
        sx={{ alignSelf: 'stretch', minHeight: 0 }}
        spacing={1}
      >
        <WeaponInventory />
        <ArmorInventory />
        <Notes
          atom={InventoryNotesAtom}
          rows={0}
          placeholder="Inventory notes"
          WrapperProps={{ sx: { flex: 1, minHeight: 0 } }}
        />
      </Grid>
    </Grid>
  );
};
