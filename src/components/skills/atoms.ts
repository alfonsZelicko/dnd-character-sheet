import { atomWithStorage } from 'jotai/utils';
import { Abilities } from '../abilities/types';
import { SkillList, SkillsType, SkillType } from './types';

const createSkillAtom = (key: string, abilityType: Abilities) =>
  atomWithStorage<SkillType>(key, {
    ability: abilityType,
    modifier: 0,
    proficiencyAndExpertise: 0,
  });

export const skillAtoms: { [key in SkillsType]: ReturnType<typeof createSkillAtom> } = Object.fromEntries(
  (Object.entries(SkillList) as [SkillsType, Abilities][]).map(([skill, ability]) => [
    skill,
    createSkillAtom(`skill-${skill.toLowerCase().replace(/ /g, '')}`, ability),
  ])
) as { [key in SkillsType]: ReturnType<typeof createSkillAtom> };

export const skillAtom = (skillName: SkillsType) => {
  const atom = skillAtoms[skillName];
  if (!atom) {
    throw new Error(`Unknown skill: ${skillName}`);
  }
  return atom;
};
