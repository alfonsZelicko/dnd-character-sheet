import { Box, SxProps, Theme } from '@mui/material';
import { useAtomValue, useSetAtom } from 'jotai';
import { selectAtom } from 'jotai/utils';
import React, { memo, useMemo } from 'react';
import { NumberLabelInput, StyledPaper } from '../../shared';
import { knownSpellsAtom, spellSlotsAtom, SpellSlotResource, SpellSlots } from '../atoms';
import { SpellListItem } from './SpellListItem';
import { getSpellLevelLabel } from '../utils';

export type SpellListProps = { level: number };

type SpellSlotUsageInputProps = { level: number };
type SpellSlotSummary = { max: number; usage: number };

const getSpellSlotSummary = (slots: SpellSlots, spellLevel: number): SpellSlotSummary => {
  return slots.reduce<SpellSlotSummary>((summary, slot, slotLevel) => {
    if (!slot || slotLevel === 0) return summary;
    const eligible = slotLevel === 10
      ? (slot.pactLevel ?? 1) >= spellLevel
      : slotLevel >= spellLevel && slotLevel <= 9;
    if (!eligible) return summary;
    return { max: summary.max + slot.max, usage: summary.usage + Math.min(slot.max, slot.usage) };
  }, { max: 0, usage: 0 });
};

const setSpellLevelUsage = (slots: SpellSlots, spellLevel: number, usage: number) => {
  const eligible = slots
    .map((slot, slotLevel) => ({ slot, slotLevel, castLevel: slotLevel === 10 ? slot?.pactLevel ?? 1 : slotLevel }))
    .filter((item): item is { slot: SpellSlotResource; slotLevel: number; castLevel: number } =>
      Boolean(item.slot) && item.slotLevel > 0 && item.slotLevel <= 10 && item.castLevel >= spellLevel
    )
    .sort((a, b) => a.castLevel - b.castLevel || a.slotLevel - b.slotLevel);
  const totalMax = eligible.reduce((total, { slot }) => total + (slot?.max ?? 0), 0);
  let remaining = Math.max(0, Math.min(totalMax, usage));
  const nextSlots = [...slots];

  eligible.forEach(({ slot, slotLevel }) => {
    if (!slot) return;
    const nextUsage = Math.min(slot.max, remaining);
    nextSlots[slotLevel] = { ...slot, usage: nextUsage };
    remaining -= nextUsage;
  });

  return nextSlots;
};

const infinitePlaceholderSx: SxProps<Theme> = {
  '& input::placeholder': { opacity: 1, color: 'text.primary', fontWeight: 600 },
};

const SpellSlotUsageInput = memo(function SpellSlotUsageInput({ level }: SpellSlotUsageInputProps) {
  const slotUsageAtom = useMemo(
    () =>
      selectAtom(
        spellSlotsAtom,
        (slots) => getSpellSlotSummary(slots, level),
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
          setSpellSlots((slots) => setSpellLevelUsage(slots, level, Number.isFinite(value) ? value : 0));
        },
      }}
    />
  );
});

export const SpellList = memo(function ({ level }: SpellListProps) {
  const levelSpellsAtom = useMemo(() => selectAtom(knownSpellsAtom, (spells) => spells[level] ?? []), [level]);
  const spells = useAtomValue(levelSpellsAtom);

  return (
    <Box
      component={StyledPaper}
      sx={{
        p: 1.5,
        width: '100%',
        minWidth: 0,
        display: 'inline-block',
        verticalAlign: 'top',
        breakInside: 'avoid',
        mb: 2,
      }}
    >
      <SpellSlotUsageInput level={level} />
      <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mt: 1, width: '100%', minWidth: 0 }}>
        {spells.map((spell) => (
          <SpellListItem key={spell.name} level={level} spell={spell} />
        ))}
      </Box>
    </Box>
  );
});
