import AddIcon from '@mui/icons-material/Add';
import { Button, Grid2 as Grid, Stack, Typography } from '@mui/material';
import { useAtom, useAtomValue } from 'jotai';
import React from 'react';
import { mergedPaperListSx } from '../../utils';
import { StyledPaper } from '../shared';
import { WeaponItem } from './WeaponItem';
import { AttackAtoms, AttackAtomsAtom } from './atoms';
import { AttackType } from './types';

const createEmptyWeapon = (): AttackType => ({
  attackName: '',
  attackBonus: '',
  range: '',
  damage: '',
  damageType: '',
  note: '',
});

export const WeaponInventory = () => {
  const weaponAtoms = useAtomValue(AttackAtomsAtom);
  const [, setWeapons] = useAtom(AttackAtoms);

  const addWeapon = () => setWeapons((current) => [...current, createEmptyWeapon()]);
  const removeWeapon = (index: number) =>
    setWeapons((current) => current.filter((_, itemIndex) => itemIndex !== index));

  return (
    <Grid container size={12} component={StyledPaper} direction="column">
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} sx={{ p: 1 }}>
        <Typography variant="h6" component="h2">
          Weapons
        </Typography>
        <Button size="small" startIcon={<AddIcon />} onClick={addWeapon}>
          Add weapon
        </Button>
      </Stack>
      <Grid container size={12} spacing={0} sx={mergedPaperListSx()}>
        {weaponAtoms.map((attackAtom, index) => (
          <WeaponItem key={index} attackAtom={attackAtom} onRemove={() => removeWeapon(index)} />
        ))}
      </Grid>
    </Grid>
  );
};
