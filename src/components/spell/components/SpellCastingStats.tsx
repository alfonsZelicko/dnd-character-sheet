import { useAtomValue } from 'jotai';
import { spellAttackAtom, spellSaveAtom } from '../../simple-components';
import React from 'react';
import { Box, Typography } from '@mui/material';

export const SpellCastingStats = () => {
  const spellAttack = useAtomValue(spellAttackAtom);
  const spellSaveDC = useAtomValue(spellSaveAtom);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography>Spell Attack:</Typography>
        <Typography>{spellAttack}</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography>Spell save DC:</Typography>
        <Typography>{spellSaveDC}</Typography>
      </Box>
    </Box>
  );
};
