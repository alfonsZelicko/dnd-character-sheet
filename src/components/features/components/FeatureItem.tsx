import React, { memo } from 'react';
import { Grid2 as Grid } from '@mui/material';
import { FeatureItemType } from '../types';
import { PrimitiveAtom } from 'jotai/vanilla/atom';
import { FeatureName, FeatureNumberInput, FeatureType } from './FIComponents';

export const FeatureItem = memo(({ featureAtom }: { featureAtom: PrimitiveAtom<FeatureItemType> }) => {
  return (
    <Grid container size={12} spacing={1} flexWrap={'nowrap'}>
      <Grid size={'grow'}>
        <FeatureName featureAtom={featureAtom} />
      </Grid>
      <Grid sx={{ width: 20 }}>
        <FeatureNumberInput featureAtom={featureAtom} name="maxUsages" />
      </Grid>
      <Grid sx={{ width: 45 }} alignContent={'flex-end'}>
        <FeatureType featureAtom={featureAtom} />
      </Grid>
      <Grid sx={{ width: 20 }}>
        <FeatureNumberInput featureAtom={featureAtom} name="used" />
      </Grid>
    </Grid>
  );
});
