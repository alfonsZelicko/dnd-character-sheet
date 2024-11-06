export enum Abilities {
  Strength = 'str',
  Dexterity = 'dex',
  Constitution = 'con',
  Intelligence = 'int',
  Charisma = 'cha',
  Wisdom = 'wis',
}

export type AbilityItemType = {
  type: Abilities;
  score: number;
  proficiency: boolean;
  modification?: number;
};

export type AbilitiesItemType = { [key in Abilities]: AbilityItemType };
