import React from 'react';
import { FeatItem } from './FeatItem';
import { useAtom } from 'jotai';
import { FeatAtomsAtom } from './atoms';
import { Grid2 as Grid } from '@mui/material';
import { FeatListProps } from './types';

export const FeatList = ({ GridProps }: FeatListProps) => {
  const [feats] = useAtom(FeatAtomsAtom);

  return feats.map((feat, index) => (
    <Grid size={4} key={index} {...GridProps}>
      <FeatItem featAtom={feat} />
    </Grid>
  ));
};
