import { NumberLabelInput, StyledLabel, StyledPaper } from '../shared';
import React from 'react';
import { CopperCoinsAtom, GoldCoinsAtom, SilverCoinsAtom } from './atoms';
import { useAtom } from 'jotai';
import { NumberInputProps } from '../shared/number-input/types';
import { Grid2 as Grid } from '@mui/material';

export const GoldCoins = (props: NumberInputProps) => {
  const [gold, setGold] = useAtom(GoldCoinsAtom);

  return (
    <NumberLabelInput
      label={'Gold coins'}
      NumberInputProps={{
        ...props,
        sx: { width: '80px' },
        value: gold,
        onChange: (e) => setGold(+e.target.value),
      }}
    />
  );
};

export const SilverCoins = () => {
  const [silver, setSilver] = useAtom(SilverCoinsAtom);

  return (
    <NumberLabelInput
      label={'Silver coins'}
      NumberInputProps={{
        sx: { width: '80px' },
        value: silver,
        onChange: (e) => setSilver(+e.target.value),
      }}
    />
  );
};

export const CopperCoins = () => {
  const [copper, setCopper] = useAtom(CopperCoinsAtom);

  return (
    <NumberLabelInput
      label={'Copper coins'}
      NumberInputProps={{
        sx: { width: '80px' },
        value: copper,
        onChange: (e) => setCopper(+e.target.value),
      }}
    />
  );
};

export const Coins = () => {
  return (
    <Grid container flexDirection={'row'} component={StyledPaper}>
      <Grid container size={12}>
        <Grid size={4}>
          <GoldCoins />
        </Grid>
        <Grid size={4}>
          <SilverCoins />
        </Grid>
        <Grid size={4}>
          <CopperCoins />
        </Grid>
      </Grid>
      <Grid size={12}>
        <StyledLabel textAlign={'right'}>Money</StyledLabel>
      </Grid>
    </Grid>
  );
};

/*
export const TemporaryHitPoints = () => {
  const [temporaryHitPoints, setTemporaryHitPoints] = useAtom(temporaryHitPointsAtom);

  return (
    <NumberLabelInput
      NumberInputProps={{
        value: removeLeadingZeros(temporaryHitPoints),
        onChange: (e) => setTemporaryHitPoints(+e.target.value),
      }}
      label="Tmp. Hit points"
    />
  );
};*/
