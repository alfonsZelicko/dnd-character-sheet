import React from 'react';
import { Button, Grid2 as Grid } from '@mui/material';
import { FeatureAtoms } from '../atoms';
import { RestType } from '../types';
import { useSetAtom } from 'jotai';

export const ResetButtons = () => {
  const setFeatures = useSetAtom(FeatureAtoms);

  const handleResting = (restType: RestType) => {
    setFeatures((prevFeatures) =>
      prevFeatures.map((feature) =>
        feature.type === restType
          ? {
              ...feature,
              used: feature.maxUsages,
            }
          : feature
      )
    );
  };

  return (
    <Grid container size={12} justifyContent={'right'} spacing={1} paddingTop={1}>
      <Button size={'small'} onClick={() => handleResting(RestType.SR)}>
        SR
      </Button>
      <Button size={'small'} onClick={() => handleResting(RestType.LR)}>
        LR
      </Button>
      <Button size={'small'} onClick={() => handleResting(RestType.DW)}>
        DW
      </Button>
    </Grid>
  );
};
