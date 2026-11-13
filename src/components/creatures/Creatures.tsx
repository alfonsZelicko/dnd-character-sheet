import { Grid2 as Grid } from '@mui/material';
import { useAtom, useAtomValue } from 'jotai';
import React, { useCallback } from 'react';
import { creatureAtomsAtom, creaturesAtom, emptyCreature } from './atoms';
import { Creature } from './Creature';
import { EditableListHeader } from '../shared/editable-list-header';

const CreatureList = React.memo(() => {
  const creatureAtoms = useAtomValue(creatureAtomsAtom);
  const [, setCreatures] = useAtom(creaturesAtom);

  const removeCreature = useCallback(
    (index: number) => setCreatures((curr) => curr.filter((_, i) => i !== index)),
    [setCreatures]
  );

  return (
    <Grid container size={12} spacing={0.5}>
      {creatureAtoms.map((creatureAtom, index) => (
        <Creature key={index} creatureAtom={creatureAtom} index={index} onRemove={removeCreature} />
      ))}
    </Grid>
  );
});

export const Creatures = () => {
  const [, setCreatures] = useAtom(creaturesAtom);

  const addCreature = useCallback(() => setCreatures((curr) => [...curr, emptyCreature()]), [setCreatures]);

  return (
    <Grid container size={12} direction="column">
      <EditableListHeader label={'Creatures'} addItem={addCreature} addItemLabel={'Add Creature'} />
      <CreatureList />
    </Grid>
  );
};
