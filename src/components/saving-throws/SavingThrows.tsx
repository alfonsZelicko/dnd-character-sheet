import React from 'react';
import { Grid2 as Grid } from '@mui/material';
import { SavingThrowItem } from './SavingThrowItem';
import { Abilities } from '../abilities/types';
import { ComponentLabel, StyledPaper } from '../shared';

export const SavingThrows = () => (
  <Grid container component={StyledPaper} direction={'row'} justifyContent={'space-between'} size={12}>
    <Grid size={6}>
      <SavingThrowItem ability={Abilities.Strength} />
      <SavingThrowItem ability={Abilities.Dexterity} />
      <SavingThrowItem ability={Abilities.Constitution} />
    </Grid>
    <Grid size={6} justifyContent={'flex-end'}>
      <SavingThrowItem ability={Abilities.Intelligence} />
      <SavingThrowItem ability={Abilities.Wisdom} />
      <SavingThrowItem ability={Abilities.Charisma} />
    </Grid>
    <ComponentLabel>Saving Throws</ComponentLabel>
  </Grid>
);
