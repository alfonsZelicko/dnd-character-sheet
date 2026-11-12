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
    checkedIcon: <CheckCircleIcon />,
    icon: <CheckCircleOutlineIcon />,
    atom: deathSaveSuccessAtom,
  },
  failure: {
    checkedIcon: <CancelIcon />,
    icon: <CancelOutlinedIcon />,
    atom: deathSaveFailureAtom,
  },
};

const PADDING_SIZE = { xs: 2, md: 0, lg: 5 };

export const DeathSaves = () => (
  <Grid container component={StyledPaper} sx={{ py: 0 }}>
    <Grid size={12} container justifyContent={'space-between'}>
      <DeathSavesCounter {...SavingThrowsConfig.success} />
      <Grid component={Typography} textAlign={'right'} lineHeight={2} sx={{ pl: PADDING_SIZE }}>
        Success
      </Grid>
    </Grid>
    <Grid size={12} container justifyContent={'space-between'}>
      <Grid component={Typography} textAlign={'left'} lineHeight={1.8} sx={{ pr: PADDING_SIZE }}>
        Failure
      </Grid>
      <DeathSavesCounter {...SavingThrowsConfig.failure} />
    </Grid>
    <ComponentLabel>Death Saves</ComponentLabel>
  </Grid>
);
