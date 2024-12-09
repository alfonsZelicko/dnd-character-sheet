import React from 'react';
import { Grid2 as Grid, Tooltip } from '@mui/material';

export const FeatureHeader = () => (
  <Grid container size={12} spacing={1} flexWrap={'nowrap'} sx={{ opacity: 0.4, fontSize: '0.8rem' }}>
    <Grid size={'grow'} textAlign={'left'}>
      Feature Name
    </Grid>
    <Grid sx={{ width: 20 }} textAlign={'center'}>
      MAX
    </Grid>
    <Grid sx={{ width: 45, textAlign: 'center' }}>SR/LR</Grid>
    <Grid sx={{ width: 20 }} textAlign={'center'}>
      <Tooltip title={'Remaining'}>
        <>Rem.</>
      </Tooltip>
    </Grid>
  </Grid>
);
