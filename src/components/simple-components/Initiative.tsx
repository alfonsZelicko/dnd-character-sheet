import { useAtom, useAtomValue } from 'jotai/index';
import { dexterityAtom } from '../abilities/atoms';
import { calculateAbilityModifier } from '../../features/utils';
import { NumberLabelInput } from '../shared';
import React from 'react';
import { initiativeAtom } from './atoms';

export const Initiative = () => {
  const [initiative, setInitiative] = useAtom(initiativeAtom);
  const { score: dexterityScore } = useAtomValue(dexterityAtom);

  const handleChange = (event: any) => {
    const { value } = event.target;
    setInitiative(value === '' ? calculateAbilityModifier(dexterityScore) : +value);
  };
  return (
    <NumberLabelInput
      NumberInputProps={{
        value: initiative,
        onChange: handleChange,
      }}
      label={'Initiative'}
    />
  );
};
