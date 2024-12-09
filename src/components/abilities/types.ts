import { ChangeEventHandler } from 'react';
import { NumberInputProps } from '../shared/number-input/types';

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

export type AbilityInputProps = {
  ability: Abilities;
  NumberInputProps?: NumberInputProps;
};

export type AbilityUIProps = {
  ability: AbilityItemType;
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  NumberInputProps?: NumberInputProps;
};

export type AbilitiesItemType = { [key in Abilities]: AbilityItemType };
