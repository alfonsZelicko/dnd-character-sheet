import { atomWithStorage, splitAtom } from 'jotai/utils';
import { CreatureType } from './types';

export const emptyCreature = (): CreatureType => ({
  id: crypto.randomUUID(),
  name: '',
  type: '',
  challengeRating: '',
  portrait: '',
  str: 10,
  dex: 10,
  con: 10,
  int: 10,
  wis: 10,
  cha: 10,
  maxHp: 0,
  currentHp: 0,
  tempHp: 0,
  armorClass: 10,
  initiative: 0,
  proficiencyBonus: 2,
  speed: 30,
  passivePerception: 10,
  traits: '',
});

export const creaturesAtom = atomWithStorage<CreatureType[]>('creatures', [emptyCreature()], undefined, {
  getOnInit: true,
});

export const creatureAtomsAtom = splitAtom(creaturesAtom);
