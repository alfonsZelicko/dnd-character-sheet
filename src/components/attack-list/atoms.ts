import { atomWithStorage, splitAtom } from 'jotai/utils';
import { AttackType } from './types';

const initAttackAtomsValue: AttackType[] = [
  {
    attackBonus: '',
    damageType: '',
    damage: '',
    attackName: '',
    range: '',
    note: '',
  },
  {
    attackBonus: '',
    damageType: '',
    damage: '',
    attackName: '',
    range: '',
    note: '',
  },
];

export const AttackAtoms = atomWithStorage<AttackType[]>('attacks-list', initAttackAtomsValue);
export const AttackAtomsAtom = splitAtom(AttackAtoms);
