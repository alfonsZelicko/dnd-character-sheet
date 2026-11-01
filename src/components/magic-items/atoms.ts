import { atomWithStorage, splitAtom } from 'jotai/utils';
import { MagicItemType } from './types';

const initialMagicItems: MagicItemType[] = Array.from({ length: 5 }, () => ({
  name: '',
  description: '',
  attuned: false,
}));

export const MagicItemAtoms = atomWithStorage<MagicItemType[]>(
  'magic-item-atoms',
  initialMagicItems,
  undefined,
  { getOnInit: true }
);
export const MagicItemAtomsAtom = splitAtom(MagicItemAtoms);
