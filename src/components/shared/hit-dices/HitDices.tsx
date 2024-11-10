import { hitDicesAtomsAtom } from './atoms';
import { useAtom } from 'jotai';
import React from 'react';
import { Grid2 as Grid } from '@mui/material';
import { StyledPaper } from '../PaperWrapper';
import { Header, HitDice } from './components';
import { ComponentLabel } from '../component-label';

export const HitDices = () => {
  const [hitDices] = useAtom(hitDicesAtomsAtom);

  return (
    <Grid container size={12} component={StyledPaper}>
      <Header />
      {hitDices.map((hitDiceAtom, index) => (
        <HitDice hitDiceAtom={hitDiceAtom} key={index} />
      ))}
      <ComponentLabel>Hit Dices</ComponentLabel>
    </Grid>
  );
};
