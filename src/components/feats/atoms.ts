import { splitAtom } from 'jotai/utils';
import { atomWithStorage } from '../../features/indexedDbStorage';
//import { FeatType } from './types';

/*const initFeatAtomValue: FeatType[] = [
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
  {
    featDescription: 'Feat Description',
    featName: 'FeatName',
  },
  {
    featDescription: 'Feat Description',
    featName: 'FeatName',
  },
];*/

// export const FeatAtoms = atomWithStorage<FeatType[]>('featsAtom', initFeatAtomValue);
export const FeatAtoms = atomWithStorage<string[]>('featsAtom', ['', '', '', ''], undefined);
export const FeatAtomsAtom = splitAtom(FeatAtoms);
