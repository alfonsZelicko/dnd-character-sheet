import { atomWithStorage, splitAtom } from 'jotai/utils';
import { InventoryItemType } from './types';

const initBackpackAtomsValue: InventoryItemType[] = [
  { name: '', quantity: 0 },
  { name: '', quantity: 0 },
  { name: '', quantity: 0 },
  { name: '', quantity: 0 },
  { name: '', quantity: 0 },
  { name: '', quantity: 0 },
  { name: '', quantity: 0 },
  { name: '', quantity: 0 },
  { name: '', quantity: 0 },
  { name: '', quantity: 0 },
  { name: '', quantity: 0 },
  { name: '', quantity: 0 },
  { name: '', quantity: 0 },
  { name: '', quantity: 0 },
  { name: '', quantity: 0 },
  { name: '', quantity: 0 },
  { name: '', quantity: 0 },
  { name: '', quantity: 0 },
  { name: '', quantity: 0 },
  { name: '', quantity: 0 },
  { name: '', quantity: 0 },
];

const initQuickSlotInventoryAtomsValue: InventoryItemType[] = [
  { name: '', quantity: 0 },
  { name: '', quantity: 0 },
  { name: '', quantity: 0 },
];

export const BackpackAtoms = atomWithStorage<InventoryItemType[]>('backpack-atom', initBackpackAtomsValue);
export const BackpackAtomsAtom = splitAtom(BackpackAtoms);
export const QuickSlotAtoms = atomWithStorage<InventoryItemType[]>('quickSlot-atom', initQuickSlotInventoryAtomsValue);
export const QuickSlotAtomsAtom = splitAtom(QuickSlotAtoms);
