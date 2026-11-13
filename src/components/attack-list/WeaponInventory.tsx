import { Grid2 as Grid } from '@mui/material';
import { useAtom, useAtomValue } from 'jotai';
import React from 'react';
import { mergedPaperListSx } from '../../utils';
import { StyledPaper } from '../shared';
import { WeaponItem } from './WeaponItem';
import { AttackAtoms, AttackAtomsAtom } from './atoms';
import { AttackType } from './types';
import { EditableListHeader } from '../shared/editable-list-header';

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
      <EditableListHeader addItem={addWeapon} label={'Weapons'} addItemLabel={'Add Weapon'} />
      <Grid container size={12} spacing={0} sx={mergedPaperListSx()}>
        {weaponAtoms.map((attackAtom, index) => (
          <WeaponItem key={index} attackAtom={attackAtom} onRemove={() => removeWeapon(index)} />
        ))}
      </Grid>
    </Grid>
  );
};
