import { PrimitiveAtom } from 'jotai/vanilla/atom';

export type AttunementState = 'attuned' | 'not-attuned' | 'not-required';

export type MagicItemType = {
  name: string;
  description: string;
  attunement: AttunementState;
};

export type MagicItemProps = {
  magicItemAtom: PrimitiveAtom<MagicItemType>;
};

export type MagicItemCardProps = {
  magicItemAtom: PrimitiveAtom<MagicItemType>;
  index: number;
};
