import { atomWithStorage } from '../../features/indexedDbStorage';

export const InventoryNotesAtom = atomWithStorage<string>('inventory-notes', '', undefined, { getOnInit: false });
