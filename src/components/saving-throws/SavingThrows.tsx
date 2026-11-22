import React from 'react';
import { Grid2 as Grid } from '@mui/material';
import { SavingThrowItem } from './SavingThrowItem';
import { Abilities } from '../abilities/types';
import { ComponentLabel, StyledPaper } from '../shared';

export const SavingThrows = () => (
  <Grid
    container
    component={StyledPaper}
    direction={'row'}
    justifyContent={'space-between'}
    size={12}
    height={'100%'}
    sx={{ position: 'relative', pl: { md: 4 } }}
  >
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
    <ComponentLabel
      sx={{
        position: 'absolute',
        right: 4,
        top: '50%',
        transform: 'translateY(-50%)',
        writingMode: 'sideways-lr',
        whiteSpace: 'nowrap',
      }}
    >
      Saving Throws
    </ComponentLabel>
  </Grid>
);
