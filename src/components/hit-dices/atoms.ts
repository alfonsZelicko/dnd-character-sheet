import { atomWithStorage, splitAtom } from 'jotai/utils';
import { HitDiceType } from './types';

const initialHitDiceAtomValue: HitDiceType[] = [
  { die: 'd6', level: 0, usage: 0 },
  { die: 'd8', level: 0, usage: 0 },
  { die: 'd10', level: 0, usage: 0 },
  { die: 'd12', level: 0, usage: 0 },
];

export const hitDicesAtom = atomWithStorage<HitDiceType[]>('hit-dices', initialHitDiceAtomValue);
export const hitDicesAtomsAtom = splitAtom(hitDicesAtom);
