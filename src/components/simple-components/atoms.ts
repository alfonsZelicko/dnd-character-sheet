import { atomWithStorage, splitAtom } from 'jotai/utils';

export const armorAtom = atomWithStorage('armor', 0);
export const initiativeAtom = atomWithStorage<number | null>('initiative', 0);
export const proficiencyBonusAtom = atomWithStorage('proficiency-bonus', 1);
export const levelAtom = atomWithStorage('level', 0);
export const classAtom = atomWithStorage('classes', '');

export const nameAtom = atomWithStorage('name', '');
export const raceAtom = atomWithStorage('race', '');
export const backgroundAtom = atomWithStorage('background', '');

export const maxHitPointsAtom = atomWithStorage('maxHitPoints', 0);
export const temporaryHitPointsAtom = atomWithStorage('temporary-hitPoints', 0);
export const currentHitPointsAtom = atomWithStorage('current-hitPoints', 0);

export const speedAtom = atomWithStorage('speed', 0);
export const sensesAtom = atomWithStorage('senses', '');

export const inventoryAtoms = atomWithStorage('inventory', ['', '', '']);
export const inventoryAtomsAtom = splitAtom(inventoryAtoms);
