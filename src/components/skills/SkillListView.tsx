import React from 'react';
import { SkillItem } from './SkillItem';
import { SkillList, SkillsType } from './types';
import { ComponentLabel } from '../shared';

export const SkillListView = () => {
  return (
    <>
      {Object.keys(SkillList).map((skill) => (
        <SkillItem skillName={skill as SkillsType} key={skill} />
      ))}
      <ComponentLabel>Skill list</ComponentLabel>
    </>
  );
};
