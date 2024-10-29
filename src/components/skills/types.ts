import { Abilities } from '../abilities/types';

export type ProfAndExpType = 0 | 1 | 2;

export type SkillType = {
  modifier: number;
  ability: Abilities;
  type?: 'basic' | 'tools';
  proficiencyAndExpertise: ProfAndExpType;
};

export const SkillList = {
  Acrobatics: Abilities.Dexterity,
  AnimalHandling: Abilities.Wisdom,
  Arcana: Abilities.Intelligence,
  Athletics: Abilities.Strength,
  Deception: Abilities.Charisma,
  History: Abilities.Intelligence,
  Insight: Abilities.Wisdom,
  Intimidation: Abilities.Charisma,
  Investigation: Abilities.Intelligence,
  Medicine: Abilities.Wisdom,
  Nature: Abilities.Intelligence,
  Perception: Abilities.Wisdom,
  Performance: Abilities.Charisma,
  Persuasion: Abilities.Charisma,
  Religion: Abilities.Intelligence,
  SleightOfHand: Abilities.Dexterity,
  Stealth: Abilities.Dexterity,
  Survival: Abilities.Wisdom,
} as const;

export type SkillsType = keyof typeof SkillList;