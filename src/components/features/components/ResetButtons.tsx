import React from 'react';
import { Button, Grid2 as Grid, Tooltip } from '@mui/material';
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
      <Tooltip title={'Reset Short Rest'}>
        <Button size={'small'} onClick={() => handleResting(RestType.SR)}>
          SR
        </Button>
      </Tooltip>
      <Tooltip title={'Reset Long Rest'}>
        <Button size={'small'} onClick={() => handleResting(RestType.LR)}>
          LR
        </Button>
      </Tooltip>
      <Tooltip title={'Reset Dawn'}>
        <Button size={'small'} onClick={() => handleResting(RestType.DW)}>
          DW
        </Button>
      </Tooltip>
    </Grid>
  );
};
