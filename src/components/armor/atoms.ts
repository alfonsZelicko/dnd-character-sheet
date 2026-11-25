import { splitAtom } from 'jotai/utils';
import { atomWithStorage } from '../../features/indexedDbStorage';
import { ArmorType } from './types';

const initialArmor: ArmorType[] = [{ category: 'Robe', name: '', description: '', proficient: false, defense: '' }];

export const ArmorAtoms = atomWithStorage<ArmorType[]>('armor-items', initialArmor, undefined);
export const ArmorAtomsAtom = splitAtom(ArmorAtoms);
