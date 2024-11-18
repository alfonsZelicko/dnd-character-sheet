import { useAtom } from 'jotai/index';
import { NumberLabelInput } from '../shared';
import React from 'react';
import { armorAtom } from './atoms';

export const Armor = () => {
  const [armor, setArmor] = useAtom(armorAtom);
  return <NumberLabelInput NumberInputProps={{ value: armor, onChange: (e) => setArmor(+e.target.value) }} label={'Armor Class'} />;
};
