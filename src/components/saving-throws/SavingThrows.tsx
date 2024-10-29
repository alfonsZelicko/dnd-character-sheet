import React from 'react';
import { Grid2 as Grid, Typography } from '@mui/material';
import { SavingThrowItem } from './SavingThrowItem';
import { Abilities } from '../abilities/types';
import { ComponentLabel } from '../shared';

export const SavingThrows = () => (
  <Grid container size={12} columnSpacing={2} rowSpacing={0} paddingRight={2}>
    <Grid size={6}>
      <SavingThrowItem ability={Abilities.Strength} />
      <SavingThrowItem ability={Abilities.Dexterity} />
      <SavingThrowItem ability={Abilities.Constitution} />
    </Grid>
    <Grid size={6}>
      <SavingThrowItem ability={Abilities.Intelligence} />
      <SavingThrowItem ability={Abilities.Wisdom} />
      <SavingThrowItem ability={Abilities.Charisma} />
    </Grid>
    <ComponentLabel>
      Saving Throws
    </ComponentLabel>
  </Grid>
);
