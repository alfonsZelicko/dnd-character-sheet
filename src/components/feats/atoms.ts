import { atomWithStorage, splitAtom } from 'jotai/utils';
import { FeatType } from './types';

const initFeatAtomValue: FeatType[] = [
  {
    featDescription: 'Feat Description',
    featName: 'FeatName',
  },
  {
    featDescription: 'Feat Description',
    featName: 'FeatName',
  },
  {
    featDescription: 'Feat Description',
    featName: 'FeatName',
  },
  {
    featDescription: 'Feat Description',
    featName: 'FeatName',
  },
];

// export const FeatAtoms = atomWithStorage<FeatType[]>('featsAtom', initFeatAtomValue);
export const FeatAtoms = atomWithStorage<string[]>('featsAtom', ['', '', '', '']);
export const FeatAtomsAtom = splitAtom(FeatAtoms);
