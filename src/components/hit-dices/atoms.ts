import { createJSONStorage } from 'jotai/utils';
import { atomWithStorage, indexedDbCharacterStorage } from '../../features/indexedDbStorage';
import { HitDiceType } from './types';

const initialHitDiceAtomValue: HitDiceType[] = [
  { die: 'd6', max: 0, usage: 0 },
  { die: 'd8', max: 0, usage: 0 },
  { die: 'd10', max: 0, usage: 0 },
  { die: 'd12', max: 0, usage: 0 },
];

const jsonStorage = createJSONStorage<HitDiceType[]>(() => indexedDbCharacterStorage);
const hitDiceStorage = {
  ...jsonStorage,
  getItem: (key: string, initialValue: HitDiceType[]) =>
    jsonStorage.getItem(key, initialValue).map((item) => ({
      die: item.die,
      max: item.max ?? item.level ?? 0,
      usage: item.usage ?? 0,
    })),
};

export const hitDicesAtom = atomWithStorage<HitDiceType[]>('hit-dices', initialHitDiceAtomValue, hitDiceStorage);
