import React from 'react';
import { useAtom } from 'jotai';
import { FeatAtomsAtom } from './atoms';
import { Grid2 as Grid } from '@mui/material';
import { FeatListProps } from './types';
import { Notes } from '../notes';

export const FeatList = ({ GridProps, WrapperProps }: FeatListProps) => {
  const [feats] = useAtom(FeatAtomsAtom);

  return feats.map((feat, index) => (
    <Grid key={index} size={12} sx={{ py: 0 }} {...GridProps}>
      <Notes
        atom={feat}
        rows={2}
        WrapperProps={{
          sx: { height: '3.5rem' },
          component: 'div',
          // borderTop: index ? '1px solid ' + InputColor : 'unset',
          boxShadow: index ? 'inset 0 1px 0 var(--app-input-color, rgba(0,0,0,0.7))' : 'unset',
          ...WrapperProps,
        }}
        placeholder={'Feat + description'}
      />
    </Grid>
  ));
};
