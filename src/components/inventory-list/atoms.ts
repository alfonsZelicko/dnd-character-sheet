import { atomWithStorage, splitAtom } from 'jotai/utils';
import { InventoryItemType } from './types';

const initInventoryAtomsValue: InventoryItemType[] = [
  {name: '', quantity: 0},
  {name: '', quantity: 0},
  {name: '', quantity: 0},
  {name: '', quantity: 0},
  {name: '', quantity: 0},
  {name: '', quantity: 0},
  {name: '', quantity: 0},
  {name: '', quantity: 0},
  {name: '', quantity: 0},
  {name: '', quantity: 0},
  {name: '', quantity: 0},
  {name: '', quantity: 0},
  {name: '', quantity: 0},
  {name: '', quantity: 0},
  {name: '', quantity: 0},
  {name: '', quantity: 0},
  {name: '', quantity: 0},
  {name: '', quantity: 0},
  {name: '', quantity: 0},
  {name: '', quantity: 0},
  {name: '', quantity: 0},
]

export const InventoryAtoms = atomWithStorage<InventoryItemType[]>('inventory-atom', initInventoryAtomsValue);
export const InventoryAtomsAtom = splitAtom(InventoryAtoms)