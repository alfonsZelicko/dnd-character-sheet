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

export type ArmorFieldInputProps = {
  atom: PrimitiveAtom<ArmorType>;
  field: 'name' | 'defense' | 'description';
  placeholder: string;
  sx?: object;
};

export type ArmorRemoveButtonProps = {
  atom: PrimitiveAtom<ArmorType>;
  onRemove: () => void;
};
