import { Grid2 as Grid } from '@mui/material';
import React from 'react';
import { TextInput } from '../shared';
import { useAtom } from 'jotai';
import { nameAtom, raceAtom, Speed } from '../simple-components';

const Name = () => {
  const [name, setName] = useAtom(nameAtom);

  return <TextInput value={name} onChange={(e) => setName(e.target.value)} label={'Name'} variant={'filled'} />;
};

const Race = () => {
  const [race, setRace] = useAtom(raceAtom);
  return <TextInput value={race} onChange={(e) => setRace(e.target.value)} label={'Race'} variant={'filled'} />;
};

export const NameRaceBackground = () => (
  <Grid container size={12} spacing={2} id={'overview'}>
    <Grid size={{ xs: 4 }}>
      <Name />
    </Grid>
    <Grid size={{ xs: 6 }}>
      <Race />
    </Grid>
    <Grid size={{ xs: 2 }}>
      <Speed />
    </Grid>
    {/* <Grid size={{ xs: 3 }}><Background /></Grid> */}
  </Grid>
);
