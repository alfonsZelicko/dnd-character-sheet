import { useAtom } from 'jotai';
import { speedAtom } from './atoms';
import { NumberLabelInput } from '../shared';
import React from 'react';

export const Speed = () => {
  const [speed, setSpeed] = useAtom(speedAtom);
  return <NumberLabelInput NumberInputProps={{ value: speed, onChange: (e) => setSpeed(+e.target.value) }} label={'Speed'} />;
};
