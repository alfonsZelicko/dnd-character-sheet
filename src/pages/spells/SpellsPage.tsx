import { Grid2 as Grid } from '@mui/material';
import React from 'react';
import { SpellPicker } from '../../components/spell';

export const SpellsPage = () => (
  <Grid
    container
    alignItems={'center'}
    flexDirection={'row'}
    sx={{ height: '100%', alignContent: 'flex-start' }}
    spacing={1}
  >
    <Grid size={{ xs: 12, md: 4 }} justifyContent={'center'}>
      <SpellPicker fullWidth={true} />
    </Grid>
    <Grid size={{ xs: 12, md: 4 }}>Ahoj 2</Grid>
    <Grid size={{ xs: 12, md: 4 }}>Ahoj 3</Grid>
  </Grid>
);
