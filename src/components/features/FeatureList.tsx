import { Grid2 as Grid } from '@mui/material';
import React, { useCallback } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { FeatureAtoms, FeatureAtomsAtom } from './atoms';
import { PrimitiveAtom } from 'jotai/vanilla/atom';
import { FeatureItemType, RestType } from './types';
import { FeatureHeader, FeatureItem } from './components';
import { ComponentLabel, StyledPaper } from '../shared';
import { RestControls, RestEvent, RestMode, restTypeForEvent, useRestSubscription } from '../rest-controls';

export const FeatureList = ({ restMode = 'global-controls' }: { restMode?: RestMode }) => {
  const features = useAtomValue(FeatureAtomsAtom);
  const setFeatures = useSetAtom(FeatureAtoms);
  const resetFeatures = useCallback(
    (restType: RestType) => {
      setFeatures((prevFeatures) =>
        prevFeatures.map((feature) => (feature.type === restType ? { ...feature, used: feature.maxUsages } : feature))
      );
    },
    [setFeatures]
  );
  const handleRest = useCallback(
    (event: RestEvent) => {
      resetFeatures(restTypeForEvent(event));
    },
    [resetFeatures]
  );
  useRestSubscription(restMode, handleRest);

  return (
    <Grid container size={12} component={StyledPaper}>
      <FeatureHeader />
      {features.map((featureAtom: PrimitiveAtom<FeatureItemType>, index) => (
        <FeatureItem featureAtom={featureAtom} key={index} />
      ))}
      {(restMode === 'local-controls' || restMode === 'global-controls') && (
        <RestControls mode={restMode} onRest={restMode === 'local-controls' ? resetFeatures : undefined} />
      )}
      <ComponentLabel>Features</ComponentLabel>
    </Grid>
  );
};
