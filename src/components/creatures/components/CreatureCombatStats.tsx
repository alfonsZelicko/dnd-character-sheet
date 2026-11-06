import { Grid2 as Grid } from '@mui/material';
import { PrimitiveAtom } from 'jotai/vanilla/atom';
import React, { memo } from 'react';
import { NumberLabelInput } from '../../shared';
import { CreatureType } from '../types';
import { useCreatureNumberField } from './hooks';

type CombatField =
  | 'maxHp'
  | 'currentHp'
  | 'tempHp'
  | 'armorClass'
  | 'initiative'
  | 'proficiencyBonus'
  | 'speed'
  | 'passivePerception';

const CombatStatInput = memo(function CombatStatInput({
  atom,
  field,
  label,
}: {
  atom: PrimitiveAtom<CreatureType>;
  field: CombatField;
  label: string;
}) {
  const { value, handleChange } = useCreatureNumberField(atom, field);

  return <NumberLabelInput label={label} NumberInputProps={{ value, onChange: handleChange }} />;
});

const combatStats: { field: CombatField; label: string }[] = [
  { field: 'currentHp', label: 'Current HP' },
  { field: 'maxHp', label: 'Max HP' },
  { field: 'tempHp', label: 'Temp HP' },
  { field: 'armorClass', label: 'Armor Class' },
  { field: 'initiative', label: 'Initiative' },
  { field: 'proficiencyBonus', label: 'Prof. Bonus' },
  { field: 'speed', label: 'Speed' },
  { field: 'passivePerception', label: 'Passive Perc.' },
];

export const CreatureCombatStats = memo(function CreatureCombatStats({
  creatureAtom,
}: {
  creatureAtom: PrimitiveAtom<CreatureType>;
}) {
  return (
    <Grid container spacing={1}>
      {combatStats.map(({ field, label }) => (
        <Grid key={field} size={3}>
          <CombatStatInput atom={creatureAtom} field={field} label={label} />
        </Grid>
      ))}
    </Grid>
  );
});
