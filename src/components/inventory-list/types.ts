import { PrimitiveAtom } from 'jotai/vanilla/atom';
import { ReactNode } from 'react';

export type InventoryItemType = {
  name: string;
  quantity: number;
};

export type InventoryListProps = {
  inventoryItems: PrimitiveAtom<InventoryItemType>[];
};

export type InventoryItemProps = {
  item: PrimitiveAtom<InventoryItemType>;
};

export type InventoryItemLayoutProps = {
  itemInput: ReactNode;
  countInput: ReactNode;
};

export type InventoryHeaderProps = { nameDescription?: string };
