import React, { Fragment } from 'react';
import { AttackAtomsAtom, optionsWeaponsOnPreviewAtom } from './atoms';
import { WeaponItem } from './WeaponItem';
import { Grid2 as Grid } from '@mui/material';
import { mergedPaperListSx } from '../../utils';
import { useAtomValue } from 'jotai/index';

export const AttackList = () => {
  const attacks = useAtomValue(AttackAtomsAtom);
  const previewWeaponCount = useAtomValue(optionsWeaponsOnPreviewAtom);
  return (
    <Grid container spacing={0} sx={mergedPaperListSx()}>
      {attacks.slice(0, Math.max(0, previewWeaponCount)).map((attackAtom, index) => (
        <Fragment key={index}>
          <WeaponItem attackAtom={attackAtom} />
        </Fragment>
      ))}
    </Grid>
  );
};
