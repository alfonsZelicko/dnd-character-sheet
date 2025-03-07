import React from 'react';
import { InventoryItemProps } from './types';
import { useAtom } from 'jotai';
import { StyledStandardTextField } from '../shared';
import { commonPropsSx } from '../attack-list/styles';
import { mergeSx } from '../../utils';
import { InventoryItemLayout } from './InventoryItemLayout';

const commonProps = {
  variant: 'standard' as 'standard',
  sx: mergeSx(commonPropsSx, { '& input': { textAlign: 'left' } }),
  fullWidth: true,
};

export const InventoryItem = ({ item }: InventoryItemProps) => {
  const [{ name, quantity }, setInventoryItem] = useAtom(item);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name: _propName, value } = event.target;
    setInventoryItem((prev) => ({ ...prev, [_propName]: value }));
  };

  const itemInput = <StyledStandardTextField value={name} name={'name'} onChange={handleChange} {...commonProps} />;
  const countInput = (
    <StyledStandardTextField
      value={quantity == 0 ? '' : quantity}
      name={'quantity'}
      type={'number'}
      onChange={handleChange}
      {...commonProps}
      sx={{ textAlign: 'center' }}
    />
  );

  return <InventoryItemLayout itemInput={itemInput} countInput={countInput} />;
};
