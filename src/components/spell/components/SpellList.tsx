import { Box, Grid2 as Grid, SxProps, Theme } from '@mui/material';
import { useAtomValue, useSetAtom } from 'jotai';
import { selectAtom } from 'jotai/utils';
import React, { memo, useMemo } from 'react';
import { NumberLabelInput, StyledPaper } from '../../shared';
import { knownSpellsAtom, spellSlotsAtom } from '../atoms';
import { SpellListItem } from './SpellListItem';
import { getSpellLevelLabel } from '../utils';

export type SpellListProps = { level: number };

type SpellSlotUsageInputProps = { level: number };

const infinitePlaceholderSx: SxProps<Theme> = {
  '& input::placeholder': { opacity: 1, color: 'text.primary', fontWeight: 600 },
};

const SpellSlotUsageInput = memo(function SpellSlotUsageInput({ level }: SpellSlotUsageInputProps) {
  const slotUsageAtom = useMemo(
    () =>
      selectAtom(
        spellSlotsAtom,
        (slots) => {
          const slot = slots[level];
          return { max: slot?.max ?? 0, usage: slot?.usage ?? 0 };
        },
        (a, b) => a.max === b.max && a.usage === b.usage
      ),
    [level]
  );
  const { max, usage } = useAtomValue(slotUsageAtom);
  const setSpellSlots = useSetAtom(spellSlotsAtom);

  return (
    <NumberLabelInput
      label={getSpellLevelLabel(level, 'spell-list')}
      NumberInputProps={{
        type: 'number',
        inputProps: { min: 0, max },
        value: level === 0 ? '' : Math.min(usage, max),
        placeholder: level === 0 ? '∞' : undefined,
        sx: level === 0 ? infinitePlaceholderSx : undefined,
        disabled: level === 0 || max < 1,
        onChange: (event) => {
          const value = Number(event.target.value);
          setSpellSlots((slots) => {
            const slot = slots[level];
            if (!slot) return slots;
            const updated = [...slots];
            updated[level] = { ...slot, usage: Math.max(0, Math.min(slot.max, Number.isFinite(value) ? value : 0)) };
            return updated;
          });
        },
      }}
    />
  );
});

export const SpellList = memo(function ({ level }: SpellListProps) {
  const levelSpellsAtom = useMemo(() => selectAtom(knownSpellsAtom, (spells) => spells[level] ?? []), [level]);
  const spells = useAtomValue(levelSpellsAtom);

  return (
    <Grid container component={StyledPaper} sx={{ p: 1.5, minWidth: 240 }} size={{ xs: 12, md: 3 }}>
      <SpellSlotUsageInput level={level} />
      <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mt: 1, width: '100%', minWidth: 0 }}>
        {spells.map((spell) => (
          <SpellListItem key={spell.name} level={level} spell={spell} />
        ))}
      </Box>
    </Grid>
  );
});
