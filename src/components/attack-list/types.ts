import { PrimitiveAtom } from 'jotai/vanilla/atom';

export type AttackAtomType = {
  attackName: string;
  attackBonus: string;
  range: string;
  damage: string;
  damageType: string;
  note: string;
};

export type AttackItemProps = {
  attackAtom: PrimitiveAtom<AttackAtomType>;
};
