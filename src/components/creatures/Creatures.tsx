import AddIcon from '@mui/icons-material/Add';
import { Button, Grid2 as Grid, Stack, Typography } from '@mui/material';
import { useAtom, useAtomValue } from 'jotai';
import React, { useCallback } from 'react';
import { creatureAtomsAtom, creaturesAtom, emptyCreature } from './atoms';
import { Creature } from './Creature';

// TODO: Performance investigation
// - Measure DOM mutations when adding a creature (MutationObserver).
// - Check how many DOM nodes are inserted during mount.
// - Identify expensive MUI components or layout recalculations.
// - Compare DOM insertion time with React Profiler measurements.
// - Remove temporary performance instrumentation afterwards.

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
      <Stack direction="row" alignItems="start" justifyContent="space-between" spacing={1} sx={{ p: 1 }}>
        <Typography variant="h6" component="h2">
          Creatures
        </Typography>
        <Button size="small" startIcon={<AddIcon />} onClick={addCreature}>
          Add creature
        </Button>
      </Stack>

      <CreatureList />
    </Grid>
  );
};
