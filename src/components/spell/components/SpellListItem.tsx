import { Box, Tooltip, Typography } from '@mui/material';
import { useSetAtom } from 'jotai';
import React, { memo } from 'react';
import { knownSpellsAtom, SpellAtom } from '../atoms';
import { schoolIconConfig, SchoolName } from '../types';
import { RemoveButton } from '../../shared';

export type SpellListItemProps = { level: number; spell: SpellAtom };

export const SpellListItem = memo(function SpellListItem({ level, spell }: SpellListItemProps) {
  const setKnownSpells = useSetAtom(knownSpellsAtom);

  const removeSpell = () => {
    setKnownSpells((currentSpells) => {
      const nextSpells = [...currentSpells];
      nextSpells[level] = (currentSpells[level] ?? []).filter((currentSpell) => currentSpell.name !== spell.name);
      return nextSpells;
    });
  };

  const school = schoolIconConfig[spell.school];
  return (
    <Box component="li" display="flex" alignItems="center" gap={1} width="100%" minWidth={0}>
      {school && (
        <Tooltip title={SchoolName[spell.school]}>
          <school.Icon sx={{ color: school.color, flexShrink: 0 }} />
        </Tooltip>
      )}
      <Typography sx={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {spell.name}
      </Typography>
      <RemoveButton
        onClick={removeSpell}
        wrapperSx={{ flexShrink: 0, ml: 'auto' }}
        tooltip={`Remove ${spell.name}`}
        ariaLabel={`Remove ${spell.name}`}
        IconProps={{ fontSize: 'small' }}
      />
    </Box>
  );
});
