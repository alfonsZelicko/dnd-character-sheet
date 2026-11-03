import { atomWithStorage, splitAtom } from 'jotai/utils';
import { ArmorType } from './types';

const initialArmor: ArmorType[] = [{ category: 'Robe', name: '', description: '', proficient: false }];

export const ArmorAtoms = atomWithStorage<ArmorType[]>('armor-items', initialArmor, undefined, { getOnInit: true });
export const ArmorAtomsAtom = splitAtom(ArmorAtoms);
