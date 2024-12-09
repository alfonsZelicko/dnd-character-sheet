import React from 'react';
import { Grid2 as Grid } from '@mui/material';
import { StyledPaper } from '../shared';
import { AbilityListView, CR, Name, Size, Type } from './components';

export const Companion = () => {
  return (
    <Grid container spacing={1} component={StyledPaper} width={'100%'}>
      <Grid container size={12} justifyContent={'space-between'}>
        <Grid size={'grow'}>
          <Name />
        </Grid>
        <Grid size={3}>
          <Type />
        </Grid>
        <Grid width={100}>
          <Size />
        </Grid>
        <Grid width={60}>
          <CR />
        </Grid>
      </Grid>
      <Grid width={400} container direction={'column'}>
        <AbilityListView />
      </Grid>
      <Grid container size={'grow'}>
        rest of the content
      </Grid>
    </Grid>
  );
};
