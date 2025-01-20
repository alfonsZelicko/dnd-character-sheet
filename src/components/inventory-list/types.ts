import { PrimitiveAtom } from 'jotai/vanilla/atom';

export type InventoryItemType = {
  name: string,
  quantity: number,
};

export type InventoryItemProps = {
  item: PrimitiveAtom<InventoryItemType>;
};