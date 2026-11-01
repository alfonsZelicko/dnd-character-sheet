import { PrimitiveAtom } from 'jotai/vanilla/atom';

export type MagicItemType = {
  name: string;
  description: string;
  attuned: boolean;
};

export type MagicItemsProps = {
  magicItems: PrimitiveAtom<MagicItemType>[];
};

export type MagicItemProps = {
  magicItemAtom: PrimitiveAtom<MagicItemType>;
};
