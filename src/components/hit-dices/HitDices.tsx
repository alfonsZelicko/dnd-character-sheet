import { hitDicesAtomsAtom } from './atoms';
import { useAtom } from 'jotai';
import React from 'react';
import { Box } from '@mui/material';
import { Header, HitDice } from './components';
import { ComponentLabel, StyledPaper } from '../shared';

export const HitDices = () => {
  const [hitDices] = useAtom(hitDicesAtomsAtom);

  return (
    <Box component={StyledPaper}>
      <Header />
      {hitDices.map((hitDiceAtom, index) => (
        <HitDice hitDiceAtom={hitDiceAtom} key={index} />
      ))}
      <ComponentLabel>Hit Dices</ComponentLabel>
    </Box>
  );
};
