import React from 'react';
import { useAtom } from 'jotai';
import { FeatAtomsAtom } from './atoms';
import { Grid2 as Grid } from '@mui/material';
import { FeatListProps } from './types';
import { Notes } from '../notes';
import { InputColor } from '../../utils';

export const FeatList = ({ GridProps, WrapperProps }: FeatListProps) => {
  const [feats] = useAtom(FeatAtomsAtom);

  return feats.map((feat, index) => (
    <Grid
      key={index}
      size={12}
      sx={{ py: 0 }}
      {...GridProps}
    >
      <Notes
        atom={feat}
        rows={2}
        WrapperProps={{ component: 'div', borderTop: index ? '1px solid ' + InputColor : 'unset', ...WrapperProps }}
        placeholder={'Feat + description'}
      />
    </Grid>
  ));
};
