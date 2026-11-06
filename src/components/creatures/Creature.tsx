import { Grid2 as Grid, Stack } from '@mui/material';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { PrimitiveAtom } from 'jotai/vanilla/atom';
import React, { memo, useCallback, useMemo } from 'react';
import { Notes } from '../notes';
import { RemoveButton, StyledPaper, TextInput } from '../shared';
import { CreatureAbilities } from './components/CreatureAbilities';
import { CreatureCombatStats } from './components/CreatureCombatStats';
import { CreatureFieldInputProps, CreatureItemProps, CreatureType } from './types';
import { mergeSx } from '../../utils';
import { CharacterImage } from '../character-image';

// ─── CreatureFieldInput ───────────────────────────────────────────────────────

const CreatureFieldInput = memo(function CreatureFieldInput({
  atom: creatureAtom,
  field,
  placeholder,
  sx,
}: CreatureFieldInputProps) {
  const fieldAtom = useMemo(() => selectAtom(creatureAtom, (s) => s[field]), [creatureAtom, field]);
  const value = useAtomValue(fieldAtom);
  const setCreature = useSetAtom(creatureAtom);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCreature((prev) => ({ ...prev, [field]: e.target.value }));
    },
    [setCreature, field]
  );

  return (
    <TextInput
      fullWidth
      variant="filled"
      label={placeholder}
      value={value}
      onChange={handleChange}
      sx={mergeSx(sx, { '& input': { fontSize: '1.2rem', fontWeight: 400 } })}
    />
  );
});

// ─── CreatureHeaderFields ─────────────────────────────────────────────────────

const CreatureHeaderFields = memo(function CreatureHeaderFields({
  creatureAtom,
  onRemove,
}: {
  creatureAtom: PrimitiveAtom<CreatureType>;
  onRemove?: () => void;
}) {
  return (
    <Grid container size={12} spacing={1} sx={{ alignItems: 'center' }}>
      <Grid size="grow">
        <CreatureFieldInput
          atom={creatureAtom}
          field="name"
          placeholder="Creature name"
          sx={{ '& input': { textAlign: 'left' } }}
        />
      </Grid>
      <Grid sx={{ width: '240px', flexShrink: 0 }}>
        <CreatureFieldInput
          atom={creatureAtom}
          field="type"
          placeholder="Type"
          sx={{ '& input': { textAlign: 'left' } }}
        />
      </Grid>
      <Grid sx={{ width: '70px', flexShrink: 0 }}>
        <CreatureFieldInput
          atom={creatureAtom}
          field="challengeRating"
          placeholder="CR"
          sx={{ '& input': { textAlign: 'center' } }}
        />
      </Grid>
      {onRemove && <RemoveButton onClick={onRemove} tooltip="Delete creature" ariaLabel="Remove creature" />}
    </Grid>
  );
});

// ─── CreatureTraits ───────────────────────────────────────────────────────────

const CreatureTraits = memo(function CreatureTraits({ creatureAtom }: { creatureAtom: PrimitiveAtom<CreatureType> }) {
  const traitsAtom = useMemo(
    () =>
      atom(
        (get) => get(creatureAtom).traits,
        (get, set, v: string) => set(creatureAtom, { ...get(creatureAtom), traits: v })
      ),
    [creatureAtom]
  );

  return (
    <Notes
      atom={traitsAtom as PrimitiveAtom<string>}
      placeholder="Traits & features"
      WrapperProps={{ sx: { flex: 1, height: '100%' } }}
    />
  );
});

// ─── Creature portrait ────────────────────────────────────────────────────────

const CreaturePortrait = ({ creatureAtom }: { creatureAtom: PrimitiveAtom<CreatureType> }) => {
  const portraitAtom = useMemo(
    () =>
      atom(
        (get) => get(creatureAtom).portrait,
        (get, set, portrait: string | null) =>
          set(creatureAtom, {
            ...get(creatureAtom),
            portrait,
          })
      ),
    [creatureAtom]
  );

  return (
    <CharacterImage
      atom={portraitAtom}
      maxSizeMB={0.5}
      sx={{ flex: 1, height: '100%', backgroundSize: 'contain' }}
      applyMaskOverride={false}
    />
  );
};
// ─── Creature ─────────────────────────────────────────────────────────────────

export const Creature = memo(function Creature({ creatureAtom, index, onRemove }: CreatureItemProps) {
  return (
    <Grid container size={6} spacing={1} component={StyledPaper} className="creature">
      <Grid size={12}>
        <CreatureHeaderFields creatureAtom={creatureAtom} onRemove={onRemove ? () => onRemove(index) : undefined} />
      </Grid>
      <Grid size={{ xs: 12, md: 2 }} sx={{ flex: 1, height: 'auto' }}>
        <Stack spacing={1} sx={{ height: '100%' }}>
          <CreatureAbilities creatureAtom={creatureAtom} />
        </Stack>
      </Grid>
      <Grid container size={{ xs: 12, md: 10 }} direction={'column'}>
        <CreatureCombatStats creatureAtom={creatureAtom} />
        <Grid container direction={'row'} sx={{ flex: 1, height: 'auto' }}>
          <Grid size={9} sx={{ height: 'auto' }}>
            <CreatureTraits creatureAtom={creatureAtom} />
          </Grid>
          <Grid size={3} sx={{ height: 'auto' }}>
            <CreaturePortrait creatureAtom={creatureAtom} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
});
