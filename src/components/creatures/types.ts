import { PrimitiveAtom } from 'jotai/vanilla/atom';

export type AttackEntry = {
  attackName: string;
  range: string;
  toHit: string;
  damage: string;
  damageType: string;
};

export type CreatureType = {
  id: string;
  name: string;
  type: string;
  size: string;
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
  savingThrows: {
    str: string;
    dex: string;
    con: string;
    int: string;
    wis: string;
    cha: string;
  };
  traits: string;
  attacks: AttackEntry[];
};

export type CreatureItemProps = {
  creatureAtom: PrimitiveAtom<CreatureType>;
  onRemove?: () => void;
};

export type CreatureFieldInputProps = {
  atom: PrimitiveAtom<CreatureType>;
  field: keyof Pick<CreatureType, 'name' | 'type' | 'size' | 'challengeRating'>;
  placeholder: string;
  sx?: object;
};

export type CreatureAttackFieldProps = {
  atom: PrimitiveAtom<CreatureType>;
  index: number;
  field: keyof AttackEntry;
  placeholder: string;
  sx?: object;
};
