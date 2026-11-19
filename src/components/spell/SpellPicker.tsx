import { Autocomplete, Box, Button, TextField, Tooltip } from '@mui/material';
import React, { memo } from 'react';
import FilterIcon from '@mui/icons-material/Filter';
import Filter1Icon from '@mui/icons-material/Filter1';
import Filter2Icon from '@mui/icons-material/Filter2';
import Filter3Icon from '@mui/icons-material/Filter3';
import Filter4Icon from '@mui/icons-material/Filter4';
import Filter5Icon from '@mui/icons-material/Filter5';
import Filter6Icon from '@mui/icons-material/Filter6';
import Filter7Icon from '@mui/icons-material/Filter7';
import Filter8Icon from '@mui/icons-material/Filter8';
import Filter9Icon from '@mui/icons-material/Filter9';
import Filter9PlusIcon from '@mui/icons-material/Filter9Plus';
import { schoolIconConfig, SchoolName, Spell, SpellPickerProps } from './types';
import { autocompleteOptionLabelNameSx, buttonSx, spellPickerSx, textFieldSx } from './styles';
import { useSpellFilter } from './hooks/useSpellFilter';

const getSpellLabel = (option: Spell) => `${option.name}`;

const isSpellEqual = (option: Spell, value: Spell) => option.name === value.name;

const levelIcons = [
  FilterIcon,
  Filter1Icon,
  Filter2Icon,
  Filter3Icon,
  Filter4Icon,
  Filter5Icon,
  Filter6Icon,
  Filter7Icon,
  Filter8Icon,
  Filter9Icon,
  Filter9PlusIcon,
];

export const SpellPicker = memo(function SpellPicker({ ...restProps }: SpellPickerProps) {
  const { options, inputValue, selectedSpell, handleInputChange, handleChange } = useSpellFilter();

  return (
    <Box sx={spellPickerSx}>
      <Autocomplete<Spell, false, false, false>
        options={options}
        value={selectedSpell}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onChange={handleChange}
        getOptionLabel={getSpellLabel}
        isOptionEqualToValue={isSpellEqual}
        renderInput={(params) => (
          <TextField {...params} variant="filled" placeholder="Search spell..." sx={textFieldSx} />
        )}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          const LevelIcon = levelIcons[option.level > 9 ? 10 : option.level];
          const school = schoolIconConfig[option.school];

          return (
            <li key={key} {...optionProps}>
              <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
                {school && (
                  <Tooltip title={SchoolName[option.school]}>
                    <school.Icon sx={{ color: school.color }} />
                  </Tooltip>
                )}
                <Box component={'span'} sx={autocompleteOptionLabelNameSx}>
                  {option.name}
                </Box>
                {LevelIcon ? <LevelIcon /> : option.level}
              </Box>
            </li>
          );
        }}
        {...restProps}
      />

      <Button variant="contained" onClick={() => {}} disabled={!selectedSpell} sx={buttonSx}>
        Add
      </Button>
    </Box>
  );
});
