import React from 'react';
import { SkillItem } from './SkillItem';
import { SkillsList, SkillsType } from './types';
import { ComponentLabel } from '../shared';

export const SkillList = () => {
  return (
    <>
      {Object.keys(SkillsList).map((skill) => (
        <SkillItem skillName={skill as SkillsType} key={skill} />
      ))}
      <ComponentLabel>Skill list</ComponentLabel>
    </>
  );
};
