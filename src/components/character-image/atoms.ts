import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const CharacterPictureAtom = atomWithStorage<string | null>('character-picture', null);
