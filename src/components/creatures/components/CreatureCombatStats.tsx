import { Grid2 as Grid, Typography } from '@mui/material';
import { useAtomValue, useSetAtom } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { PrimitiveAtom } from 'jotai/vanilla/atom';
import React, { memo, useCallback, useMemo } from 'react';
import { NumberLabelInput } from '../../shared';
import { CreatureType } from '../types';

type NumericCombatField =
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
  field: NumericCombatField;
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

export const CreatureCombatStats = ({ creatureAtom }: { creatureAtom: PrimitiveAtom<CreatureType> }) => (
  <Grid container spacing={0.5}>
    <Grid size={12}>
      <Typography variant="caption" sx={{ textTransform: 'uppercase', fontWeight: 600 }}>
        HP
      </Typography>
    </Grid>
    <Grid size={12}>
      <CombatStatInput atom={creatureAtom} field="currentHp" label="Current HP" />
    </Grid>
    <Grid size={12}>
      <CombatStatInput atom={creatureAtom} field="maxHp" label="Max HP" />
    </Grid>
    <Grid size={12}>
      <CombatStatInput atom={creatureAtom} field="tempHp" label="Temp HP" />
    </Grid>
    <Grid size={12}>
      <CombatStatInput atom={creatureAtom} field="armorClass" label="Armor Class" />
    </Grid>
    <Grid size={12}>
      <CombatStatInput atom={creatureAtom} field="initiative" label="Initiative" />
    </Grid>
    <Grid size={12}>
      <CombatStatInput atom={creatureAtom} field="proficiencyBonus" label="Prof. Bonus" />
    </Grid>
    <Grid size={12}>
      <CombatStatInput atom={creatureAtom} field="speed" label="Speed" />
    </Grid>
    <Grid size={12}>
      <CombatStatInput atom={creatureAtom} field="passivePerception" label="Passive Perc." />
    </Grid>
  </Grid>
);
