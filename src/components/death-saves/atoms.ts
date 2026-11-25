import { atomWithStorage } from '../../features/indexedDbStorage';

export const deathSaveSuccessAtom = atomWithStorage('death_save-success', 0);
export const deathSaveFailureAtom = atomWithStorage('death_save-failure', 0);
