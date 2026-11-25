import { atomWithStorage } from '../../features';

export const InventoryNotesAtom = atomWithStorage<string[]>('inventory-notes', [''], undefined);
