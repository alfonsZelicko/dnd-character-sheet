import React from 'react';
import { useAtom } from 'jotai';
import { FeatAtomsAtom } from './atoms';
import { Grid2 as Grid } from '@mui/material';
import { FeatListProps } from './types';
import { StyledPaper } from '../shared';
import { Notes } from '../notes';

export const FeatList = ({ GridProps }: FeatListProps) => {
  const [feats] = useAtom(FeatAtomsAtom);

  return feats.map((feat, index) => (
    <Grid key={index} size={12} component={StyledPaper} sx={{ py: 0 }} {...GridProps}>
      {/*<FeatItem featAtom={feat} />*/}
      <Notes atom={feat} rows={2} WrapperProps={{ component: 'div' }} placeholder={'Feat + description'} />
    </Grid>
  ));
};
