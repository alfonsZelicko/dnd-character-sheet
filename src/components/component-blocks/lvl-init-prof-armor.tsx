import { Grid2 as Grid } from '@mui/material';
import React from 'react';
import { Armor, Initiative, LvlAndClass, ProficiencyBonus } from '../simple-components';

export const BaseStats = () => {
  return (
    <>
      <Grid size={12}>
        <LvlAndClass />
      </Grid>
      <Grid size={4}>
        <Initiative />
      </Grid>
      <Grid size={4}>
        <ProficiencyBonus />
      </Grid>
      <Grid size={4}>
        <Armor />
      </Grid>
    </>
  );
};
