import { Box, Checkbox, Tooltip, Typography } from '@mui/material';
import { useSetAtom } from 'jotai';
import React, { memo } from 'react';
import { knownSpellsAtom } from '../atoms';
import { schoolIconConfig, SchoolName, SpellListItemProps } from '../types';
import { RemoveButton } from '../../shared';
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';

export const SpellListItem = memo(function SpellListItem({ level, spell }: SpellListItemProps) {
  const setKnownSpells = useSetAtom(knownSpellsAtom);

  const removeSpell = () => {
    setKnownSpells((currentSpells) => {
      const nextSpells = [...currentSpells];
      nextSpells[level] = (currentSpells[level] ?? []).filter((currentSpell) => currentSpell.name !== spell.name);
      return nextSpells;
    });
  };

  const togglePrepared = () => {
    setKnownSpells((currentSpells) => {
      const nextSpells = [...currentSpells];
      nextSpells[level] = (currentSpells[level] ?? []).map((currentSpell) =>
        currentSpell.name === spell.name ? { ...currentSpell, prepared: !currentSpell.prepared } : currentSpell
      );
      return nextSpells;
    });
  };

  const school = schoolIconConfig[spell.school];
  const isPrepared = Boolean(spell.prepared);
  return (
    <Box component="li" display="flex" alignItems="center" gap={1} width="100%" minWidth={0}>
      {school && (
        <Tooltip title={SchoolName[spell.school]}>
          <school.Icon sx={{ color: isPrepared ? school.color : 'text.disabled', flexShrink: 0 }} />
        </Tooltip>
      )}
      <Typography
        sx={{
          flex: 1,
          minWidth: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          color: isPrepared ? 'text.primary' : 'text.disabled',
        }}
      >
        {spell.name}
      </Typography>
      <Tooltip title={isPrepared ? 'Unprepare' : 'Prepare'}>
        <Checkbox
          size="small"
          checked={isPrepared}
          onChange={togglePrepared}
          checkedIcon={<CheckBoxTwoToneIcon />}
          inputProps={{ 'aria-label': `Prepare ${spell.name}` }}
          sx={{ flexShrink: 0, p: 0.5 }}
        />
      </Tooltip>
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
