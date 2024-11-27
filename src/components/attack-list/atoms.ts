import { atomWithStorage, splitAtom } from 'jotai/utils';
import { AttackAtomType } from './types';

const initAttackAtomsValue: AttackAtomType[] = [
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

export const AttackAtoms = atomWithStorage<AttackAtomType[]>('attacks-list', initAttackAtomsValue);
export const AttackAtomsAtom = splitAtom(AttackAtoms);
