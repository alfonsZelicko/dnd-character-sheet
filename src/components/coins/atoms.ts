import { atomWithStorage } from 'jotai/utils';

const initGoldCoinsAtomsValue: number = 0;
const initSilverCoinsAtomsValue: number = 0;
const initCopperCoinsAtomsValue: number = 0;

export const GoldCoinsAtom = atomWithStorage<number>('gold-coins-atom', initGoldCoinsAtomsValue);
export const SilverCoinsAtom = atomWithStorage<number>('silver-coins-atom', initSilverCoinsAtomsValue);
export const CopperCoinsAtom = atomWithStorage<number>('copper-coins-atom', initCopperCoinsAtomsValue);
