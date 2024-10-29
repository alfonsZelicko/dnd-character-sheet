import { atomWithStorage } from 'jotai/utils';
import { Abilities, AbilityItemType } from './types';

export const getAbilityFullName = (ability: Abilities): string | undefined => {
  return Object.keys(Abilities).find((key) => Abilities[key as keyof typeof Abilities] === ability);
};

export const strengthAtom = atomWithStorage<AbilityItemType>('ability-strength', {
  type: Abilities.Strength,
  score: 1,
  proficiency: false,
});

export const dexterityAtom = atomWithStorage<AbilityItemType>('ability-dexterity', {
  type: Abilities.Dexterity,
  score: 1,
  proficiency: false,
});

export const constitutionAtom = atomWithStorage<AbilityItemType>('ability-constitution', {
  type: Abilities.Constitution,
  score: 1,
  proficiency: false,
});

export const intelligenceAtom = atomWithStorage<AbilityItemType>('ability-intelligence', {
  type: Abilities.Intelligence,
  score: 1,
  proficiency: false,
});

export const charismaAtom = atomWithStorage<AbilityItemType>('ability-charisma', {
  type: Abilities.Charisma,
  score: 1,
  proficiency: false,
});

export const wisdomAtom = atomWithStorage<AbilityItemType>('ability-wisdom', {
  type: Abilities.Wisdom,
  score: 1,
  proficiency: false,
});

export const getAbilityAtom = (ability: Abilities) => {
  switch (ability) {
    case Abilities.Strength:
      return strengthAtom;
    case Abilities.Dexterity:
      return dexterityAtom;
    case Abilities.Constitution:
      return constitutionAtom;
    case Abilities.Intelligence:
      return intelligenceAtom;
    case Abilities.Charisma:
      return charismaAtom;
    case Abilities.Wisdom:
      return wisdomAtom;
    default:
      throw new Error(`Unknown ability: ${ability}`);
  }
};

/*export const setProficiencyAtom = (_ability: Abilities) =>
  atom(
    () => '',
    (get, set, proficiency: boolean) => {
      const ability = get(abilityAtom(_ability));
    }
  );*/
