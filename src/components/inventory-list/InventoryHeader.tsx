import { InventoryItemLayout } from './InventoryItemLayout';
import { ComponentLabel } from '../shared';
import React from 'react';
import { InventoryHeaderProps } from './types';

export const InventoryHeader = ({ nameDescription = 'Item name' }: InventoryHeaderProps) => {
  const ItemNameHeader = <ComponentLabel textAlign={'left'}>{nameDescription}</ComponentLabel>;
  const ItemCountHeader = <ComponentLabel sx={{ pr: 1 }}>Σ</ComponentLabel>;

  return <InventoryItemLayout itemInput={ItemNameHeader} countInput={ItemCountHeader} />;
};
