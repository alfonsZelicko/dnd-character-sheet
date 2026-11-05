import AddIcon from '@mui/icons-material/Add';
import { Button, Grid2 as Grid, Stack, Typography } from '@mui/material';
import { useAtom, useAtomValue } from 'jotai';
import React from 'react';
import { mergedPaperListSx } from '../../utils';
import { StyledPaper } from '../shared';
import { emptyCreature } from './atoms';
import { creaturesAtom, creatureAtomsAtom } from './atoms';
import { Creature } from './Creature';

export const Creatures = () => {
  const creatureAtoms = useAtomValue(creatureAtomsAtom);
  const [, setCreatures] = useAtom(creaturesAtom);

  const addCreature = () => setCreatures((curr) => [...curr, emptyCreature()]);
  const removeCreature = (index: number) =>
    setCreatures((curr) => curr.filter((_, i) => i !== index));

  return (
    <Grid container size={12} component={StyledPaper} direction="column">
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} sx={{ p: 1 }}>
        <Typography variant="h6" component="h2">
          Creatures
        </Typography>
        <Button size="small" startIcon={<AddIcon />} onClick={addCreature}>
          Add creature
        </Button>
      </Stack>
      <Grid container size={12} spacing={0} sx={mergedPaperListSx()}>
        {creatureAtoms.map((creatureAtom, index) => (
          <Creature key={index} creatureAtom={creatureAtom} onRemove={() => removeCreature(index)} />
        ))}
      </Grid>
    </Grid>
  );
};
