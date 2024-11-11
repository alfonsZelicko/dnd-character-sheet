import { Grid2 as Grid } from '@mui/material';
import React from 'react';
import { TextInput } from '../shared';
import { backgroundAtom, nameAtom, raceAtom } from './atoms';
import { useAtom } from 'jotai';

const Name = () => {
  const [name, setName] = useAtom(nameAtom);

  return <TextInput value={name} onChange={(e) => setName(e.target.value)} label={'Name'} variant={'filled'} />;
};

const Race = () => {
  const [race, setRace] = useAtom(raceAtom);
  return <TextInput value={race} onChange={(e) => setRace(e.target.value)} label={'Race'} variant={'filled'} />;
};

const Background = () => {
  const [background, setBackground] = useAtom(backgroundAtom);

  return <TextInput value={background} onChange={(e) => setBackground(e.target.value)} label={'Background'} variant={'filled'} />;
};

export const NameRaceBackground = () => (
  <Grid container size={12} spacing={2} id={'overview'}>
    <Grid size={{ xs: 5 }}>
      <Name />
    </Grid>
    <Grid size={{ xs: 7 }}>
      <Race />
    </Grid>
    {/* <Grid size={{ xs: 3 }}><Background /></Grid> */}
  </Grid>
);