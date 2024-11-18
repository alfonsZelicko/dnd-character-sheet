import { useAtom } from 'jotai/index';
import { NumberLabelInput } from '../shared';
import React from 'react';
import { proficiencyBonusAtom } from './atoms';

export const ProficiencyBonus = () => {
  const [profBonus, setProfBonus] = useAtom(proficiencyBonusAtom);
  return (
    <NumberLabelInput
      NumberInputProps={{
        value: profBonus,
        onChange: (e) => setProfBonus(+e.target.value > 1 ? +e.target.value : 1),
      }}
      label={'Proficiency bonus'}
    />
  );
};
