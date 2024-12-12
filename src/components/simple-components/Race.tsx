import React from 'react';
import { TextInput } from '../shared';
import { raceAtom } from './atoms';
import { useAtom } from 'jotai';

export const Race = () => {
  const [race, setRace] = useAtom(raceAtom);

  return (
    <TextInput
      value={race}
      onChange={(e) => setRace(e.target.value)}
      label={'Race'}
      variant={'filled'}
      sx={{ '& input': { fontWeight: 200 } }}
    />
  );
};
