import { atomWithStorage } from 'jotai/utils';
import { SizeType } from './types';
import { Abilities } from '../abilities/types';

// Initialize single character's data
const initialCharacter = {
  name: 'Arthan Brightblade',
  race: 'Elf',
  size: 'medium' as SizeType,
  cr: 3,
  abilities: [
    { score: 16, type: Abilities.Strength },
    { score: 18, type: Abilities.Dexterity },
    { score: 14, type: Abilities.Constitution },
    { score: 12, type: Abilities.Intelligence },
    { score: 10, type: Abilities.Wisdom },
    { score: 14, type: Abilities.Charisma },
  ],
  traitsAndFeatures: 'Darkvision, Fey Ancestry, Trance',
  attacks: [
    {
      attackName: 'Longsword Slash',
      attackBonus: '+5',
      range: '5 ft',
      damage: '1d8 + 3',
      damageType: 'slashing',
      note: 'Versatile (1d10)',
    },
    {
      attackName: 'Shortbow Shot',
      attackBonus: '+6',
      range: '80/320 ft',
      damage: '1d6 + 4',
      damageType: 'piercing',
      note: '',
    },
  ],
  maxHp: 36,
  hp: 36,
  temporaryHp: 0,
  currentHp: 36,
  initiative: 4,
  armorClass: 15,
  proficiencyBonus: 2,
  speed: {
    fly: 0,
    walking: 30,
  },
  passivePerception: 14,
};

export const nameAtom = atomWithStorage('companionName', initialCharacter.name);
export const raceAtom = atomWithStorage('companionRace', initialCharacter.race);
export const sizeAtom = atomWithStorage('companionSize', initialCharacter.size);
export const crAtom = atomWithStorage('companionCr', initialCharacter.cr);
export const abilitiesAtom = atomWithStorage('companionAbilities', initialCharacter.abilities);
export const featuresAtom = atomWithStorage('companionFeatures', initialCharacter.traitsAndFeatures);
export const attacksAtom = atomWithStorage('companionAttacks', initialCharacter.attacks);
export const maxHpAtom = atomWithStorage('companionMaxHp', initialCharacter.maxHp);
export const currentHpAtom = atomWithStorage('companionCurrentHp', initialCharacter.currentHp);
export const temporaryHpAtom = atomWithStorage('companionTemporaryHp', initialCharacter.temporaryHp);
export const initiativeAtom = atomWithStorage('companionInitiative', initialCharacter.initiative);
export const armorClassAtom = atomWithStorage('companionArmorClass', initialCharacter.armorClass);
export const profBonusAtom = atomWithStorage('companionProfBonus', initialCharacter.proficiencyBonus);
export const speedAtom = atomWithStorage('companionSpeed', initialCharacter.speed);
export const passivePerceptionAtom = atomWithStorage('companionPassivePerception', initialCharacter.passivePerception);
