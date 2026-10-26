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
};

/* for feature use */

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
