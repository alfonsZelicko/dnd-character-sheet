import React from 'react';
import { useAtom } from 'jotai';
import { FeatAtomsAtom } from './atoms';
import { Grid2 as Grid } from '@mui/material';
import { FeatListProps } from './types';
import { Notes } from '../notes';
import { InputColor } from '../../utils';

/*  return (
    <Grid size={12} component={StyledPaper} sx={{ py: 0 }} {...GridProps}>
      {feats.map((feat, index) => (
        <Notes
          key={index}
          atom={feat}
          rows={2}
          WrapperProps={{ component: 'div' }}
          placeholder={'Feat + description'}
        />
      ))}
    </Grid>
  );
};*/

export const FeatList = ({ GridProps, WrapperProps }: FeatListProps) => {
  const [feats] = useAtom(FeatAtomsAtom);

  return feats.map((feat, index) => (
    <Grid key={index} size={12} sx={{ py: 0 }} {...GridProps}>
      {/*<FeatItem featAtom={feat} />*/}
      <Notes
        atom={feat}
        rows={2}
        WrapperProps={{ component: 'div', borderTop: index ? '1px solid ' + InputColor : 'unset', ...WrapperProps }}
        placeholder={'Feat + description'}
        sx={{ '& .MuiInputBase-root textarea': { height: '40px !important' } }}
      />
    </Grid>
  ));
};
