import { Grid2 as Grid, Tooltip } from '@mui/material';
import { NumberLabelInput } from '../shared';
import { DeathSaves } from '../death-saves';
import React, { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { wisdomAtom } from '../abilities/atoms';
import { calculateAbilityModifier } from '../../features/utils';
import { skillAtom } from '../skills';
import { Exhaustion } from '../exhaustion';
import { HitDices } from '../hit-dices';
import { CurrentHitPoints, MaxHitPoints, proficiencyBonusAtom, TemporaryHitPoints } from '../simple-components';

export const PassivePerception = () => {
  const { proficiencyAndExpertise, modifier } = useAtomValue(skillAtom('Perception'));
  // const [passivePerception, setPassivePerception] = useAtom(passivePerceptionAtom);
  const proficiencyBonus = useAtomValue(proficiencyBonusAtom);
  const { score: wisdomScore } = useAtomValue(wisdomAtom);
  const tooltipTitle = `10+${proficiencyBonus}{proficiencyBonus}*${proficiencyAndExpertise}{prof/exp}+${modifier}{modifier}+${calculateAbilityModifier(wisdomScore)}{wis}`;

  const calculatedPassivePerception = useMemo(
    () => 10 + proficiencyAndExpertise * proficiencyBonus + modifier + calculateAbilityModifier(wisdomScore),
    [proficiencyAndExpertise, modifier, proficiencyBonus]
  );

  /*useEffect(() => {
    const result = 10 + proficiencyAndExpertise * proficiencyBonus + modifier + calculateAbilityModifier(wisdomScore);
  }, [proficiencyAndExpertise, modifier, proficiencyBonus]);

  const handleChange = (event: any) => {
    const { value } = event.target;
    setPassivePerception(value === '' ? calculatedPassivePerception : +value);
  };*/

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

export const HpDeathSavesPasPerception = () => {
  return (
    <Grid size={12} container spacing={2} justifyContent={'flex-start'}>
      <Grid container size={5.5} direction="column">
        <TemporaryHitPoints />
        <CurrentHitPoints />
        <MaxHitPoints />

        <Exhaustion />
      </Grid>
      <Grid container size={6.5} direction="column">
        {/* <CharacterPreview /> */}
        <DeathSaves />
        <HitDices />
      </Grid>
    </Grid>
  );
};
