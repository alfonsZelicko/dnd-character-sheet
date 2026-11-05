import { Stack } from '@mui/material';
import { useAtomValue, useSetAtom } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { PrimitiveAtom } from 'jotai/vanilla/atom';
import React, { memo, useCallback, useMemo } from 'react';
import { NumberLabelInput } from '../../shared';
import { CreatureType } from '../types';

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
  const fieldAtom = useMemo(() => selectAtom(atom, (s) => s[field]), [atom, field]);
  const value = useAtomValue(fieldAtom);
  const set = useSetAtom(atom);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      set((prev) => ({ ...prev, [field]: +e.target.value }));
    },
    [set, field],
  );

  return <NumberLabelInput label={label} NumberInputProps={{ value, onChange: handleChange }} />;
});

export const CreatureAbilities = ({ creatureAtom }: { creatureAtom: PrimitiveAtom<CreatureType> }) => (
  <Stack spacing={0.5}>
    <AbilityInput atom={creatureAtom} field="str" label="STR" />
    <AbilityInput atom={creatureAtom} field="dex" label="DEX" />
    <AbilityInput atom={creatureAtom} field="con" label="CON" />
    <AbilityInput atom={creatureAtom} field="int" label="INT" />
    <AbilityInput atom={creatureAtom} field="wis" label="WIS" />
    <AbilityInput atom={creatureAtom} field="cha" label="CHA" />
  </Stack>
);
