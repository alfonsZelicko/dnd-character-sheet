import { useAtom } from 'jotai';
import { NumberLabelInput } from '../shared';
import React from 'react';
import { spellAttackAtom } from './atoms';

export const SpellAttack = () => {
  const [spellAttack, setSpellAttack] = useAtom(spellAttackAtom);
  return (
    <NumberLabelInput
      NumberInputProps={{ value: spellAttack, onChange: (e) => setSpellAttack(+e.target.value) }}
      label={'Spellcasting Attack Bonus'}
    />
  );
};
