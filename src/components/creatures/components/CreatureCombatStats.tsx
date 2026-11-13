import { Grid2 as Grid } from '@mui/material';
import { PrimitiveAtom } from 'jotai/vanilla/atom';
import React, { memo } from 'react';
import { NumberLabelInput, TextInput } from '../../shared';
import { CreatureType } from '../types';
import { useCreatureField } from './hooks';

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
  const { value, handleChange } = useCreatureField(atom, field);

  if (typeof value === 'number')
    return <NumberLabelInput label={label} NumberInputProps={{ value, onChange: handleChange }} />;

  return (
    <TextInput
      fullWidth
      variant="filled"
      label={label}
      value={value}
      onChange={handleChange}
      sx={{ '& input': { fontSize: '1rem', fontWeight: 400 } }}
    />
  );
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
        <Grid key={field} size={{ xs: 6, md: 3 }}>
          <CombatStatInput atom={creatureAtom} field={field} label={label} />
        </Grid>
      ))}
    </Grid>
  );
});
