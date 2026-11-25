import { atom } from 'jotai';
import { splitAtom } from 'jotai/utils';
import { atomWithStorage } from '../../features/indexedDbStorage';
import { SetStateAction } from 'react';

export const armorAtom = atomWithStorage('armor', 0);
export const initiativeAtom = atomWithStorage<number | null>('initiative', 0);
export const proficiencyBonusAtom = atomWithStorage('proficiency-bonus', 1);
export const levelAtom = atomWithStorage('level', 0);
export const classAtom = atomWithStorage('classes', '');

export const nameAtom = atomWithStorage('name', '');
export const raceAtom = atomWithStorage('race', '');

const storedMaxHitPointsAtom = atomWithStorage('maxHitPoints', 0);
const storedCurrentHitPointsAtom = atomWithStorage('current-hitPoints', 0);

export const maxHitPointsAtom = atom(
  (get) => get(storedMaxHitPointsAtom),
  (get, set, update: SetStateAction<number>) => {
    const maxHitPoints = typeof update === 'function' ? update(get(storedMaxHitPointsAtom)) : update;
    set(storedMaxHitPointsAtom, maxHitPoints);
    set(storedCurrentHitPointsAtom, Math.min(get(storedCurrentHitPointsAtom), maxHitPoints));
  }
);
export const temporaryHitPointsAtom = atomWithStorage('temporary-hitPoints', 0);
export const currentHitPointsAtom = atom(
  (get) => Math.min(get(storedCurrentHitPointsAtom), get(maxHitPointsAtom)),
  (get, set, update: SetStateAction<number>) => {
    const currentHitPoints = get(currentHitPointsAtom);
    const nextHitPoints = typeof update === 'function' ? update(currentHitPoints) : update;
    set(storedCurrentHitPointsAtom, Math.min(nextHitPoints, get(maxHitPointsAtom)));
  }
);

export const speedAtom = atomWithStorage('speed', 0);
export const characterDescriptionAtom = atomWithStorage('character-description', '', undefined);

export const noteAtoms = atomWithStorage('notes', ['', '', ''], undefined);
export const noteAtomsAtom = splitAtom(noteAtoms);

export const spellAttackAtom = atomWithStorage('spell-attack', 0, undefined);
export const spellSaveAtom = atomWithStorage('spell-save', 0, undefined);
