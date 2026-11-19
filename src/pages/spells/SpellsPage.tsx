import { Box, Grid2 as Grid } from '@mui/material';
import React from 'react';
import { knownSpellsAtom, SpellList, SpellPicker, SpellSlotCounter, spellSlotsAtom } from '../../components/spell';
import { atom, useAtomValue } from 'jotai';
import { selectAtom } from 'jotai/utils';

const spellLevelsAtom = selectAtom(
  atom((get) => {
    const knownSpells = get(knownSpellsAtom);
    const spellSlots = get(spellSlotsAtom);
    return Array.from({ length: 11 }, (_, level) => level)
      .filter((level) => (knownSpells[level]?.length ?? 0) > 0 || (level > 0 && (spellSlots[level]?.max ?? 0) > 0))
      .sort((a, b) => a - b);
  }),
  (levels) => levels,
  (previous, next) => previous.length === next.length && previous.every((level, index) => level === next[index])
);

export const SpellsPage = () => {
  const levels = useAtomValue(spellLevelsAtom);

  return (
    <Grid
      container
      alignItems="flex-start"
      flexDirection="row"
      sx={{ height: '100%', alignContent: 'flex-start' }}
      spacing={1}
    >
      <Grid size={{ xs: 12, md: 4 }}>
        <Box display="flex" flexDirection="column" gap={1}>
          <SpellPicker fullWidth />
          <SpellSlotCounter />
        </Box>
      </Grid>
      <Grid container size={{ xs: 12, md: 8 }} flexDirection={'column'} spacing={2}>
        {levels.map((level) => (
          <SpellList key={level} level={level} />
        ))}
      </Grid>
    </Grid>
  );
};
