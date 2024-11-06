import { Grid2 as Grid, Tooltip } from '@mui/material';
import { NumberLabelInput } from '../shared';
import { DeathSaves } from '../death-saves';
import React from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { currentHitPointsAtom, maxHitPointsAtom, proficiencyBonusAtom, temporaryHitPointsAtom } from './atoms';
import { wisdomAtom } from '../abilities/atoms';
import { calculateAbilityModifier } from '../../features/utils';
import { skillAtom } from '../skills/atoms';

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
  const proficiencyBonus = useAtomValue(proficiencyBonusAtom);
  const { score: wisdomScore } = useAtomValue(wisdomAtom);
  const tooltipTitle = `10+${proficiencyBonus}{proficiencyBonus}*${proficiencyAndExpertise}{prof/exp}+${modifier}{modifier}+${calculateAbilityModifier(wisdomScore)}{wis}`;

  return (
    <Tooltip title={tooltipTitle}>
      <span>
        <NumberLabelInput
          NumberInputProps={{ value: 10 + proficiencyAndExpertise * proficiencyBonus + modifier + calculateAbilityModifier(wisdomScore) }}
          label="Passive Perception"
        />
      </span>
    </Tooltip>
  );
};

export const HpDeathSavesPasPerception = () => {
  return (
    <Grid size={12} container spacing={2}>
      <Grid container size={6}>
        <TemporaryHitPoints />
        <CurrentHitPoints />
        <MaxHitPoints />
      </Grid>
      <Grid container size={6}>
        <PassivePerception />
        <DeathSaves />
      </Grid>
    </Grid>
  );
};
