import { useAtom } from 'jotai';
import { NumberLabelInput } from '../shared';
import React from 'react';
import { spellSaveAtom } from './atoms';

export const SpellSave = () => {
  const [spellSave, setSpellSave] = useAtom(spellSaveAtom);
  return (
    <NumberLabelInput
      NumberInputProps={{ value: spellSave, onChange: (e) => setSpellSave(+e.target.value) }}
      label={'Spell Save DC'}
    />
  );
};
