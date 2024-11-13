import React, { memo } from 'react';
import { Grid2 as Grid, Typography } from '@mui/material';

export const Header = memo(() => (
  <Grid container direction={'row'} size={12}>
    <Grid size={3}>
      <Typography textAlign={'center'} textTransform={'uppercase'}>
        lvl
      </Typography>
    </Grid>
    <Grid size={6}>
      <Typography textAlign={'center'} textTransform={'uppercase'}>
        die
      </Typography>
    </Grid>
    <Grid size={3}>
      <Typography textAlign={'center'} textTransform={'uppercase'}>
        usage
      </Typography>
    </Grid>
  </Grid>
));
