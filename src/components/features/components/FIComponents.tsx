import { PrimitiveAtom } from 'jotai/vanilla/atom';
import { FeatureItemType, RestType } from '../types';
import { useAtomValue } from 'jotai/index';
import { StandardNumberInput, StyledStandardTextField } from '../../shared';
import React, { useCallback } from 'react';
import { MenuItem, Select } from '@mui/material';
import { featureCommonProps, useFeatureChange } from './utils';

export const FeatureName = ({ featureAtom }: { featureAtom: PrimitiveAtom<FeatureItemType> }) => {
  const featureName = useAtomValue(featureAtom).featureName;
  const handleChange = useFeatureChange(featureAtom);

  return (
    <StyledStandardTextField
      value={featureName}
      name={'featureName'}
      placeholder={'feature name'}
      onChange={handleChange}
      {...{
        ...featureCommonProps,
        sx: {
          '& input,.MuiSelect-select': {
            textAlign: 'left',
            fontWeight: 200,
            fontSize: '1rem',
          },
        },
      }}
    />
  );
};

export const FeatureNumberInput = ({
  featureAtom,
  name,
}: {
  featureAtom: PrimitiveAtom<FeatureItemType>;
  name: 'used' | 'maxUsages';
}) => {
  const value = useAtomValue(featureAtom)[name];
  const handleChange = useFeatureChange(featureAtom);

  return (
    <StandardNumberInput type="number" value={value} name={name} onChange={handleChange} {...featureCommonProps} />
  );
};

export const FeatureType = ({ featureAtom }: { featureAtom: PrimitiveAtom<FeatureItemType> }) => {
  const { type } = useAtomValue(featureAtom);
  const handleChange = useFeatureChange(featureAtom);

  const renderValue = useCallback(
    (selected: any) => {
      if (!selected) return '-';
      const key = Object.entries(RestType).find(([, value]) => value === selected)?.[0];
      return key || 'Unknown';
    },
    [type]
  );

  return (
    <Select variant="standard" fullWidth renderValue={renderValue} value={type} name="type" onChange={handleChange}>
      <MenuItem value="" disabled>
        Select Rest Type
      </MenuItem>
      <MenuItem value={RestType.SR}>{RestType.SR}</MenuItem>
      <MenuItem value={RestType.LR}>{RestType.LR}</MenuItem>
      <MenuItem value={RestType.DW}>{RestType.DW}</MenuItem>
    </Select>
  );
};
