import { atomWithStorage } from 'jotai/utils';
import { MoneyAndLootType } from './types';

const moneyAndLootInitialValue: MoneyAndLootType = {
  loot: '',
  gp: 0,
  sp: 0,
  ep: 0,
};

export const MoneyAndLootAtom = atomWithStorage<MoneyAndLootType>('moneyAndLoot', moneyAndLootInitialValue);
