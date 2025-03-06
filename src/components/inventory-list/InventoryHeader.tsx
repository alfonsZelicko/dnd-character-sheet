import { InventoryItemLayout } from './InventoryItemLayout';
import { StyledLabel } from '../shared';
import React from 'react';
import { InventoryHeaderProps } from './types';

export const InventoryHeader = ({ nameDescription = 'Item name' }: InventoryHeaderProps) => {
  const ItemNameHeader = <StyledLabel>{nameDescription}</StyledLabel>;
  const ItemCountHeader = <StyledLabel textAlign={'center'}>Σ</StyledLabel>;

  return <InventoryItemLayout itemInput={ItemNameHeader} countInput={ItemCountHeader} />;
};
