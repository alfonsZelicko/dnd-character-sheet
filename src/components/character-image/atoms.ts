import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const CharacterPictureAtom = atomWithStorage<string | null>('character-picture', null);

export const ApplyCharaPicMask = atomWithStorage<boolean | null>('character-picture-mask', null);
