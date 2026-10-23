import { atomWithStorage, splitAtom } from 'jotai/utils';
import { InventoryItemType, MagicItemType } from './types';

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

const initMagicItemAtomsValue: MagicItemType[] = [
  { name: '', description: '', attuned: false },
  { name: '', description: '', attuned: false },
  { name: '', description: '', attuned: false },
];

const initGoldCoinsAtomsValue: number = 0;
const initSilverCoinsAtomsValue: number = 0;
const initCopperCoinsAtomsValue: number = 0;

export const GoldCoinsAtom = atomWithStorage<number>('gold-coins-atom', initGoldCoinsAtomsValue);
export const SilverCoinsAtom = atomWithStorage<number>('silver-coins-atom', initSilverCoinsAtomsValue);
export const CopperCoinsAtom = atomWithStorage<number>('copper-coins-atom', initCopperCoinsAtomsValue);
export const BackpackAtoms = atomWithStorage<InventoryItemType[]>('backpack-atom', initBackpackAtomsValue);
export const BackpackAtomsAtom = splitAtom(BackpackAtoms);
export const QuickSlotAtoms = atomWithStorage<InventoryItemType[]>('quickSlot-atom', initQuickSlotInventoryAtomsValue);
export const QuickSlotAtomsAtom = splitAtom(QuickSlotAtoms);
