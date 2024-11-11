import { Grid2 as Grid, Tooltip } from '@mui/material';
import { HitDices, NumberLabelInput } from '../shared';
import { DeathSaves } from '../death-saves';
import React, { useMemo } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { currentHitPointsAtom, maxHitPointsAtom, proficiencyBonusAtom, temporaryHitPointsAtom } from './atoms';
import { wisdomAtom } from '../abilities/atoms';
import { calculateAbilityModifier } from '../../features/utils';
import { skillAtom } from '../skills';
import { Exhaustion } from '../exhaustion';

export const TemporaryHitPoints = () => {
  const [temporaryHitPoints, setTemporaryHitPoints] = useAtom(temporaryHitPointsAtom);

  return <NumberLabelInput NumberInputProps={{ value: temporaryHitPoints, onChange: (e) => setTemporaryHitPoints(+e.target.value) }} label="Tmp. Hit points" />;
};

export const CurrentHitPoints = () => {
  const [currentHitPoints, setCurrentHitPoints] = useAtom(currentHitPointsAtom);

  return <NumberLabelInput NumberInputProps={{ value: currentHitPoints, onChange: (e) => setCurrentHitPoints(+e.target.value) }} label="Current Hit points" />;
};

export const MaxHitPoints = () => {
  const [maxHitPoints, setMaxHitPoints] = useAtom(maxHitPointsAtom);

  return <NumberLabelInput NumberInputProps={{ value: maxHitPoints, onChange: (e) => setMaxHitPoints(+e.target.value) }} label="Max Hit points" />;
};

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
                readOnly: true,
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