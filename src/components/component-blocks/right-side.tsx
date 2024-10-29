import { Grid2 as Grid } from '@mui/material';
import React from 'react';
import { NumberLabelInput } from '../shared';

export const RightSide = () => {
  return (
    <>
      <Grid container size={6}>
        <Grid size={12}>
          <NumberLabelInput label={'Temp. Hit points'} />
        </Grid>
        <Grid size={12}>
          <NumberLabelInput label={'Current Hit points'} />
        </Grid>
      </Grid>
      <Grid container size={6}>
        <Grid size={12}>
          <NumberLabelInput label={'Speed'} />
        </Grid>
        <Grid size={12}>
          <NumberLabelInput label={'Max Hit points'} />
        </Grid>
      </Grid>
      <Grid container alignItems={'flex-start'} size={12}>
        <Grid size={6}>
          <NumberLabelInput label={'Passive Perception'} />
        </Grid>
        <Grid size={12}>hh</Grid>
      </Grid>
    </>
  );
};
