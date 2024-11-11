import React from 'react';
import { Grid2 as Grid, Typography } from '@mui/material';
import { ComponentLabel, StyledPaper } from '../shared';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { deathSaveFailureAtom, deathSaveSuccessAtom } from './atoms';
import { DeathSavesCounter } from './DeathSaveCounter';

const SavingThrowsConfig = {
  success: {
    checkedIcon: <CancelIcon />,
    icon: <CancelOutlinedIcon />,
    atom: deathSaveSuccessAtom,
  },
  failure: {
    checkedIcon: <CheckCircleIcon />,
    icon: <CheckCircleOutlineIcon />,
    atom: deathSaveFailureAtom,
  },
};

export const DeathSaves = () => (
  <Grid container size={12} component={StyledPaper}>
    <Grid size={12} container>
      <DeathSavesCounter {...SavingThrowsConfig.success} />
      <Grid size={'grow'} component={Typography} textAlign={'right'} lineHeight={2}>
        Success
      </Grid>
    </Grid>
    <Grid size={12} container>
      <Grid size={'grow'} component={Typography} lineHeight={1.8}>
        Failure
      </Grid>
      <DeathSavesCounter {...SavingThrowsConfig.failure} />
    </Grid>
    <ComponentLabel>Death Saves</ComponentLabel>
  </Grid>
);
