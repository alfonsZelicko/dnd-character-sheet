import { Stack } from '@mui/material';
import { PrimitiveAtom } from 'jotai/vanilla/atom';
import React, { memo } from 'react';
import { NumberTextFieldInput } from '../../shared';
import { calculateAbilityModifier, formatWithPlusSign, removeLeadingZeros } from '../../../features/utils';
import { CreatureType } from '../types';
import { useCreatureNumberField } from './hooks';

type AbilityKey = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';

const AbilityInput = memo(function AbilityInput({
  atom,
  field,
  label,
}: {
  atom: PrimitiveAtom<CreatureType>;
  field: AbilityKey;
  label: string;
}) {
  const { value, handleChange } = useCreatureNumberField(atom, field);

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

const abilities: { field: AbilityKey; label: string }[] = [
  { field: 'str', label: 'STR' },
  { field: 'dex', label: 'DEX' },
  { field: 'con', label: 'CON' },
  { field: 'int', label: 'INT' },
  { field: 'wis', label: 'WIS' },
  { field: 'cha', label: 'CHA' },
];

export const CreatureAbilities = memo(function CreatureAbilities({
  creatureAtom,
}: {
  creatureAtom: PrimitiveAtom<CreatureType>;
}) {
  return (
    <Stack spacing={0.5} sx={{ flex: 1, justifyContent: 'space-between' }}>
      {abilities.map(({ field, label }) => (
        <AbilityInput key={field} atom={creatureAtom} field={field} label={label} />
      ))}
    </Stack>
  );
});
