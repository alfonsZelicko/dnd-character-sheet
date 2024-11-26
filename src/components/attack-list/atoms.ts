import { atomWithStorage, splitAtom } from 'jotai/utils';
import { AttackAtomType } from './types';

const initAttackAtomsValue: AttackAtomType[] = [
  {
    attackBonus: '+9',
    damageType: 'force',
    damage: '1d10 + 5',
    attackName: 'Eldritch Blast',
    range: '150 feet',
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
