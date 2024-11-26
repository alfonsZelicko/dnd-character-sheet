import React, { Fragment } from 'react';
import { useAtom } from 'jotai';
import { AttackAtomsAtom } from './atoms';
import { AttackItem } from './AttackItem';
import { Grid2 as Grid } from '@mui/material';
import { mergedPaperListSx } from '../../utils';

export const AttackList = () => {
  const [attacks] = useAtom(AttackAtomsAtom);
  return (
    <Grid container spacing={0} sx={mergedPaperListSx()}>
      {attacks.map((attackAtom, index) => (
        <Fragment key={index}>
          <AttackItem attackAtom={attackAtom} />
        </Fragment>
      ))}
    </Grid>
  );
};
