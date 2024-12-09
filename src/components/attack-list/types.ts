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
