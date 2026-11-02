import React, { Fragment } from 'react';
import { AttackAtomsAtom } from './atoms';
import { AttackItem } from './AttackItem';
import { Grid2 as Grid } from '@mui/material';
import { mergedPaperListSx } from '../../utils';
import { useAtomValue } from 'jotai/index';
import { optionsWeaponsOnPreviewAtom } from './atoms';

export const AttackList = () => {
  const attacks = useAtomValue(AttackAtomsAtom);
  const previewWeaponCount = useAtomValue(optionsWeaponsOnPreviewAtom);
  return (
    <Grid container spacing={0} sx={mergedPaperListSx()}>
      {attacks.slice(0, Math.max(0, previewWeaponCount)).map((attackAtom, index) => (
        <Fragment key={index}>
          <AttackItem attackAtom={attackAtom} />
        </Fragment>
      ))}
    </Grid>
  );
};
