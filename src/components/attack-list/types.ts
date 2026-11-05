import { PrimitiveAtom } from 'jotai/vanilla/atom';

export type AttackType = {
  attackName: string;
  attackBonus: string;
  range: string;
  damage: string;
  damageType: string;
  note: string;
};

export type AttackItemProps = {
  attackAtom: PrimitiveAtom<AttackType>;
  onRemove?: () => void;
};

export type WeaponFieldInputProps = {
  atom: PrimitiveAtom<AttackType>;
  field: keyof AttackType;
  placeholder: string;
  sx?: object;
  width?: number | string;
  fullWidth?: boolean;
};

export type WeaponRemoveButtonProps = {
  atom: PrimitiveAtom<AttackType>;
  onRemove: () => void;
};

export enum DamageType {
  Acid = 'Acid',
  Bludgeoning = 'Bludgeoning',
  Cold = 'Cold',
  Fire = 'Fire',
  Force = 'Force',
  Lightning = 'Lightning',
  Necrotic = 'Necrotic',
  Piercing = 'Piercing',
  Poison = 'Poison',
  Psychic = 'Psychic',
  Radiant = 'Radiant',
  Slashing = 'Slashing',
  Thunder = 'Thunder',
}
