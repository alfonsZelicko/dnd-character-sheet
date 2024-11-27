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
    <Grid size={6} justifyItems={'flex-end'}>
      <SavingThrowItem ability={Abilities.Intelligence} WrapperProps={{ justifyContent: 'flex-end' }} />
      <SavingThrowItem ability={Abilities.Wisdom} WrapperProps={{ justifyContent: 'flex-end' }} />
      <SavingThrowItem ability={Abilities.Charisma} WrapperProps={{ justifyContent: 'flex-end' }} />
    </Grid>
    <ComponentLabel>Saving Throws</ComponentLabel>
  </Grid>
);
