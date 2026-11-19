import React from 'react';
import { useAtom } from 'jotai';
import { FeatAtomsAtom } from './atoms';
import { Grid2 as Grid, useMediaQuery } from '@mui/material';
import { FeatListProps } from './types';
import { Notes } from '../notes';
import { StyledPaper } from '../shared';
import { theme } from '../../utils';

export const FeatList = ({ GridProps, WrapperProps }: FeatListProps) => {
  const [feats] = useAtom(FeatAtomsAtom);
  const isMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Grid
      container
      size={12}
      justifyContent={'space-between'}
      direction={{ xs: 'row', md: 'column' }}
      component={StyledPaper}
    >
      {feats.map((feat, index) => (
        <Grid key={index} size={{ xs: 6, md: 12 }} sx={{ py: 0 }} {...GridProps}>
          <Notes
            atom={feat}
            rows={isMd ? 3 : 4}
            WrapperProps={{
              sx: { height: '3.5rem' },
              component: 'div',
              // borderTop: index ? '1px solid ' + InputColor : 'unset',
              boxShadow: {
                xs: index > 1 ? 'inset 0 1px 0 var(--app-input-color, rgba(0,0,0,0.7))' : 'unset',
                md: index ? 'inset 0 1px 0 var(--app-input-color, rgba(0,0,0,0.7))' : 'unset',
              },
              ...WrapperProps,
            }}
            placeholder={'Feat + description'}
          />
        </Grid>
      ))}
    </Grid>
  );
};
