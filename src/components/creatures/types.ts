import { PrimitiveAtom } from 'jotai/vanilla/atom';

export type CreatureType = {
  id: string;
  name: string;
  type: string;
  portrait: string | null;
  challengeRating: string;
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
  maxHp: number;
  currentHp: number;
  tempHp: number;
  armorClass: number;
  initiative: number;
  proficiencyBonus: number;
  speed: number;
  passivePerception: number;
  traits: string;
};

export interface CreatureItemProps {
  creatureAtom: PrimitiveAtom<CreatureType>;
  index: number;
  onRemove?: (index: number) => void;
}

export type CreatureFieldInputProps = {
  atom: PrimitiveAtom<CreatureType>;
  field: keyof Pick<CreatureType, 'name' | 'type' | 'challengeRating'>;
  placeholder: string;
  sx?: object;
};
