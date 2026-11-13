import { Grid2 as Grid } from '@mui/material';
import { PrimitiveAtom } from 'jotai/vanilla/atom';
import React, { memo } from 'react';
import { NumberTextFieldInput } from '../../shared';
import { calculateAbilityModifier, formatWithPlusSign, removeLeadingZeros } from '../../../features/utils';
import { CreatureType } from '../types';
import { useCreatureField } from './hooks';
import { creatureAbilitiesSx } from './styles';

const abilities = [
  { field: 'str', label: 'STR' },
  { field: 'dex', label: 'DEX' },
  { field: 'con', label: 'CON' },
  { field: 'int', label: 'INT' },
  { field: 'wis', label: 'WIS' },
  { field: 'cha', label: 'CHA' },
] as const;

type AbilityKey = (typeof abilities)[number]['field'];

const AbilityInput = memo(function AbilityInput({
  atom,
  field,
  label,
}: {
  atom: PrimitiveAtom<CreatureType>;
  field: AbilityKey;
  label: string;
}) {
  const { value, handleChange } = useCreatureField(atom, field);

  return (
    <NumberTextFieldInput
      TextFieldProps={{ label, value: formatWithPlusSign(calculateAbilityModifier(value)) }}
      NumberInputProps={{
        value: removeLeadingZeros(value),
        onChange: handleChange,
      }}
    />
  );
});

export const CreatureAbilities = memo(function CreatureAbilities({
  creatureAtom,
}: {
  creatureAtom: PrimitiveAtom<CreatureType>;
}) {
  return (
    <Grid container spacing={0.5} flexDirection={'column'} sx={creatureAbilitiesSx}>
      {abilities.map(({ field, label }) => (
        <Grid key={field} size={12} sx={{ flex: 1, justifyContent: 'space-between' }}>
          <AbilityInput atom={creatureAtom} field={field} label={label} />
        </Grid>
      ))}
    </Grid>
  );
});
