import { useAtomValue } from 'jotai';
import { skillAtom } from '../skills';
import { proficiencyBonusAtom } from './atoms';
import { wisdomAtom } from '../abilities/atoms';
import { calculateAbilityModifier } from '../../features/utils';
import React, { useMemo } from 'react';
import { Box, Tooltip } from '@mui/material';
import { NumberLabelInput } from '../shared';

export const PassivePerception = () => {
  const { proficiencyAndExpertise, modifier, advantage } = useAtomValue(skillAtom('Perception'));
  const proficiencyBonus = useAtomValue(proficiencyBonusAtom);
  const { score: wisdomScore } = useAtomValue(wisdomAtom);
  const tooltipTitle = `10+${proficiencyBonus}{proficiencyBonus}*${proficiencyAndExpertise}{prof/exp}+${modifier}{modifier}+${calculateAbilityModifier(wisdomScore)}{wis}${
    advantage === undefined ? '' : advantage ? '+5{advantage}' : '-5{disadvantage}'
  }`;

  const calculatedPassivePerception = useMemo(
    () =>
      10 +
      proficiencyAndExpertise * proficiencyBonus +
      modifier +
      calculateAbilityModifier(wisdomScore) +
      (advantage ? 5 : advantage === undefined ? 0 : -5),
    [proficiencyAndExpertise, modifier, proficiencyBonus, advantage]
  );

  return (
    <Tooltip title={tooltipTitle}>
      <Box sx={{ width: '100%' }} component={'span'}>
        <NumberLabelInput
          NumberInputProps={{
            showIncButtons: false,
            value: calculatedPassivePerception,
            slotProps: {
              input: {
                disabled: true,
              },
            },
            //onChange: handleChange,
          }}
          label="Passive Perception"
        />
      </Box>
    </Tooltip>
  );
};
