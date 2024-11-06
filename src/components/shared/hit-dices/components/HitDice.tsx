import { PrimitiveAtom } from 'jotai/vanilla/atom';
import { HitDiceType } from '../types';
import { useAtom } from 'jotai/index';
import React from 'react';
import { Grid2 as Grid } from '@mui/material';
import { StandardNumberInput } from '../../number-input';
import { StyledNumberField } from '../../number-input/styled';

export const HitDice = ({ hitDiceAtom }: { hitDiceAtom: PrimitiveAtom<HitDiceType> }) => {
  const [hitDice, setHitDice] = useAtom(hitDiceAtom);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setHitDice((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Grid container direction={'row'} size={12}>
      <Grid size={3}>
        <StandardNumberInput onChange={handleChange} name="level" value={hitDice.level} />
      </Grid>
      <Grid size={6}>
        <StyledNumberField name="die" variant={'standard'} type={'text'} value={hitDice.die} />
      </Grid>
      <Grid size={3}>
        <StandardNumberInput onChange={handleChange} name="usage" value={hitDice.usage} />
      </Grid>
    </Grid>
  );
};
