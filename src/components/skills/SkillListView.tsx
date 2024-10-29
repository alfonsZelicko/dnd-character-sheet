import React from 'react';
import { SkillItem } from './SkillItem';
import { SkillList, SkillsType } from './types';

export const SkillListView = () => {
  return (
    <>
      {Object.keys(SkillList).map((skill) => (
        <SkillItem skillName={skill as SkillsType} key={skill} />
      ))}
    </>
  );
};
