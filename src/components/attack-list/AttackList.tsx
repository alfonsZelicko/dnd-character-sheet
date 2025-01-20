import React, { Fragment } from 'react';
import { AttackAtomsAtom } from './atoms';
import { AttackItem } from './AttackItem';
import { Grid2 as Grid } from '@mui/material';
import { mergedPaperListSx } from '../../utils';
import { useAtomValue } from 'jotai/index';

export const AttackList = () => {
  const attacks = useAtomValue(AttackAtomsAtom);
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
