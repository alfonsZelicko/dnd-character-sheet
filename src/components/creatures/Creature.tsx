import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Grid2 as Grid, IconButton, Stack, Tooltip } from '@mui/material';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { PrimitiveAtom } from 'jotai/vanilla/atom';
import React, { memo, useCallback, useMemo } from 'react';
import { Notes } from '../notes/Notes';
import { StyledPaper, StyledStandardTextField } from '../shared';
import { CreatureAbilities } from './components/CreatureAbilities';
import { CreatureActions } from './components/CreatureActions';
import { CreatureCombatStats } from './components/CreatureCombatStats';
import { CreatureFieldInputProps, CreatureItemProps, CreatureType } from './types';

// ─── CreatureFieldInput ───────────────────────────────────────────────────────

const CreatureFieldInput = memo(function CreatureFieldInput({ atom: creatureAtom, field, placeholder, sx }: CreatureFieldInputProps) {
  const fieldAtom = useMemo(() => selectAtom(creatureAtom, (s) => s[field]), [creatureAtom, field]);
  const value = useAtomValue(fieldAtom);
  const setCreature = useSetAtom(creatureAtom);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCreature((prev) => ({ ...prev, [field]: e.target.value }));
    },
    [setCreature, field],
  );

  return (
    <StyledStandardTextField
      fullWidth
      variant="standard"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      sx={sx}
    />
  );
});

// ─── CreatureHeaderFields ─────────────────────────────────────────────────────

const CreatureHeaderFields = memo(function CreatureHeaderFields({
  creatureAtom,
}: {
  creatureAtom: PrimitiveAtom<CreatureType>;
}) {
  return (
    <Grid container size={12} spacing={1} sx={{ alignItems: 'flex-end' }}>
      <Grid size="grow">
        <CreatureFieldInput
          atom={creatureAtom}
          field="name"
          placeholder="Creature name"
          sx={{ '& input': { textAlign: 'left', fontSize: '1rem', fontWeight: 600 } }}
        />
      </Grid>
      <Grid sx={{ width: '80px', flexShrink: 0 }}>
        <CreatureFieldInput
          atom={creatureAtom}
          field="type"
          placeholder="Type"
          sx={{ '& input': { textAlign: 'center', fontSize: '1rem', fontWeight: 200 } }}
        />
      </Grid>
      <Grid sx={{ width: '70px', flexShrink: 0 }}>
        <CreatureFieldInput
          atom={creatureAtom}
          field="size"
          placeholder="Size"
          sx={{ '& input': { textAlign: 'center', fontSize: '1rem', fontWeight: 200 } }}
        />
      </Grid>
      <Grid sx={{ width: '50px', flexShrink: 0 }}>
        <CreatureFieldInput
          atom={creatureAtom}
          field="challengeRating"
          placeholder="CR"
          sx={{ '& input': { textAlign: 'center', fontSize: '1rem', fontWeight: 200 } }}
        />
      </Grid>
    </Grid>
  );
});

// ─── CreatureSavingThrows ─────────────────────────────────────────────────────

type SavingThrowKey = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';

const SavingThrowInput = memo(function SavingThrowInput({
  creatureAtom,
  field,
  label,
}: {
  creatureAtom: PrimitiveAtom<CreatureType>;
  field: SavingThrowKey;
  label: string;
}) {
  const fieldAtom = useMemo(() => selectAtom(creatureAtom, (s) => s.savingThrows[field]), [creatureAtom, field]);
  const value = useAtomValue(fieldAtom);
  const setCreature = useSetAtom(creatureAtom);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCreature((prev) => ({ ...prev, savingThrows: { ...prev.savingThrows, [field]: e.target.value } }));
    },
    [setCreature, field],
  );

  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      <StyledStandardTextField
        variant="standard"
        placeholder={label}
        value={value}
        onChange={handleChange}
        sx={{ width: '100%', '& input': { textAlign: 'center', fontSize: '0.9rem', fontWeight: 200 } }}
      />
    </Stack>
  );
});

const SAVING_THROW_KEYS: { field: SavingThrowKey; label: string }[] = [
  { field: 'str', label: 'STR save' },
  { field: 'dex', label: 'DEX save' },
  { field: 'con', label: 'CON save' },
  { field: 'int', label: 'INT save' },
  { field: 'wis', label: 'WIS save' },
  { field: 'cha', label: 'CHA save' },
];

const CreatureSavingThrows = memo(function CreatureSavingThrows({
  creatureAtom,
}: {
  creatureAtom: PrimitiveAtom<CreatureType>;
}) {
  return (
    <Stack spacing={0.5}>
      {SAVING_THROW_KEYS.map(({ field, label }) => (
        <SavingThrowInput key={field} creatureAtom={creatureAtom} field={field} label={label} />
      ))}
    </Stack>
  );
});

// ─── CreatureTraits ───────────────────────────────────────────────────────────

const CreatureTraits = memo(function CreatureTraits({
  creatureAtom,
}: {
  creatureAtom: PrimitiveAtom<CreatureType>;
}) {
  const traitsAtom = useMemo(
    () =>
      atom(
        (get) => get(creatureAtom).traits,
        (get, set, v: string) => set(creatureAtom, { ...get(creatureAtom), traits: v }),
      ),
    [creatureAtom],
  );

  return <Notes atom={traitsAtom as PrimitiveAtom<string>} placeholder="Traits & features" rows={4} />;
});

// ─── Creature ─────────────────────────────────────────────────────────────────

export const Creature = ({ creatureAtom, onRemove }: CreatureItemProps) => {
  return (
    <Grid container size={12} spacing={1} component={StyledPaper} className="paperItem">
      {onRemove && (
        <Grid size={12} sx={{ display: 'flex', justifyContent: 'flex-end', pb: 0 }}>
          <Tooltip title="Delete creature">
            <IconButton size="small" aria-label="Remove creature" onClick={onRemove}>
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Grid>
      )}
      {/* Left column: abilities + saving throws */}
      <Grid size={{ xs: 12, md: 3 }}>
        <Stack spacing={1}>
          <CreatureAbilities creatureAtom={creatureAtom} />
          <CreatureSavingThrows creatureAtom={creatureAtom} />
        </Stack>
      </Grid>
      {/* Right column: header, combat stats, traits, actions */}
      <Grid size={{ xs: 12, md: 9 }}>
        <Stack spacing={1}>
          <CreatureHeaderFields creatureAtom={creatureAtom} />
          <CreatureCombatStats creatureAtom={creatureAtom} />
          <CreatureTraits creatureAtom={creatureAtom} />
          <CreatureActions creatureAtom={creatureAtom} />
        </Stack>
      </Grid>
    </Grid>
  );
};
