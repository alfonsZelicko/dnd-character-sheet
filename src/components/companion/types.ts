import { AttackType } from '../attack-list/types';
import { Abilities } from '../abilities/types';

export type SizeType = 'small' | 'medium' | 'large' | 'huge';

export type CompanionAbilityType = { score: number; type: Abilities };

export type CharacterType = {
  name: string;
  race: string;
  size: SizeType;
  cr: number;
  abilities: CompanionAbilityType[];
  traitsAndFeatures: string;
  attacks: AttackType[];
  maxHp: number;
  hp: number;
  temporaryHp: number;
  currentHp: number;
  initiative: number;
  armorClass: number;
  proficiencyBonus: number;
  speed: { fly: number; walking: number };
  passivePerception: number;
};
