import { useAtom, useAtomValue } from 'jotai';
import { ArmorAtoms, ArmorAtomsAtom } from './atoms';
import { Grid2 as Grid } from '@mui/material';
import { StyledPaper } from '../shared';
import React from 'react';
import { ArmorItem } from './ArmorItem';
import { ArmorType } from './types';
import { EditableListHeader } from '../shared/editable-list-header';

const createEmptyArmor = (): ArmorType => ({
  category: 'Robe',
  name: '',
  defense: '',
  description: '',
  proficient: false,
});

export const ArmorInventory = () => {
  const [, setArmorItems] = useAtom(ArmorAtoms);
  const armorAtoms = useAtomValue(ArmorAtomsAtom);

  const addArmor = () => setArmorItems((items) => [...items, createEmptyArmor()]);
  const removeArmor = (index: number) => setArmorItems((items) => items.filter((_, i) => i !== index));

  return (
    <Grid container size={12} component={StyledPaper} direction="column">
      <EditableListHeader addItem={addArmor} label={'Armors'} addItemLabel={'Add Armor'} />
      <Grid container size={12} spacing={1} direction="row">
        {armorAtoms.map((armorAtom, index) => (
          <ArmorItem key={index} armorAtom={armorAtom} onRemove={() => removeArmor(index)} />
        ))}
      </Grid>
    </Grid>
  );
};
