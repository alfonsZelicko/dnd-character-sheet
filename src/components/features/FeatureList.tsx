import { Grid2 as Grid } from '@mui/material';
import React from 'react';
import { useAtomValue } from 'jotai';
import { FeatureAtomsAtom } from './atoms';
import { PrimitiveAtom } from 'jotai/vanilla/atom';
import { FeatureItemType } from './types';
import { FeatureHeader, FeatureItem, ResetButtons } from './components';
import { StyledPaper } from '../shared';

export const FeatureList = () => {
  const features = useAtomValue(FeatureAtomsAtom);
  return (
    <Grid container size={12} component={StyledPaper}>
      <FeatureHeader />
      {features.map((featureAtom: PrimitiveAtom<FeatureItemType>, index) => (
        <FeatureItem featureAtom={featureAtom} key={index} />
      ))}
      <ResetButtons />
    </Grid>
  );
};
