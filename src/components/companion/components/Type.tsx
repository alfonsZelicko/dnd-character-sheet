import { TextInput } from '../../shared';
import React from 'react';
import { useAtom } from 'jotai';
import { raceAtom } from '../atoms';

export const Type = () => {
  const [race, setRace] = useAtom(raceAtom);

  return (
    <TextInput
      size={'small'}
      value={race}
      onChange={(e) => setRace(e.target.value)}
      label={'Type'}
      variant={'filled'}
    />
  );
};
