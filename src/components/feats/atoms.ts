import { atomWithStorage, splitAtom } from 'jotai/utils';
import { FeatType } from './types';

const initFeatAtomValue: FeatType[] = [
  {
    featDescription: 'Lorem Ipsum',
    featName: 'Lorem',
  },
  {
    featDescription: 'Lorem Ipsum',
    featName: 'Lorem',
  },
  {
    featDescription: 'Lorem Ipsum',
    featName: 'Lorem',
  },
];

export const FeatAtoms = atomWithStorage<FeatType[]>('featsAtom', initFeatAtomValue);
export const FeatAtomsAtom = splitAtom(FeatAtoms);
