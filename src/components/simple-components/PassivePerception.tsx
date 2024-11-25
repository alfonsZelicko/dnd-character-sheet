import { useAtomValue } from 'jotai/index';
import { skillAtom } from '../skills';
import { proficiencyBonusAtom } from './atoms';
import { wisdomAtom } from '../abilities/atoms';
import { calculateAbilityModifier } from '../../features/utils';
import React, { useMemo } from 'react';
import { Tooltip } from '@mui/material';
import { NumberLabelInput } from '../shared';

export const PassivePerception = () => {
  const { proficiencyAndExpertise, modifier } = useAtomValue(skillAtom('Perception'));
  const proficiencyBonus = useAtomValue(proficiencyBonusAtom);
  const { score: wisdomScore } = useAtomValue(wisdomAtom);
  const tooltipTitle = `10+${proficiencyBonus}{proficiencyBonus}*${proficiencyAndExpertise}{prof/exp}+${modifier}{modifier}+${calculateAbilityModifier(wisdomScore)}{wis}`;

  const calculatedPassivePerception = useMemo(
    () => 10 + proficiencyAndExpertise * proficiencyBonus + modifier + calculateAbilityModifier(wisdomScore),
    [proficiencyAndExpertise, modifier, proficiencyBonus]
  );

  return (
    <Tooltip title={tooltipTitle}>
      <span>
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
      </span>
    </Tooltip>
  );
};
