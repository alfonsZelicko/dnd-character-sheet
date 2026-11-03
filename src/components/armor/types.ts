import { PrimitiveAtom } from 'jotai/vanilla/atom';

export type ArmorCategory = 'Robe' | 'Light' | 'Medium' | 'Heavy';

export type ArmorType = {
  category: ArmorCategory;
  name: string;
  defense: string;
  description: string;
  proficient: boolean;
};

export type ArmorItemProps = {
  armorAtom: PrimitiveAtom<ArmorType>;
  onRemove?: () => void;
};
