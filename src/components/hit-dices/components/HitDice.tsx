import { PrimitiveAtom } from 'jotai/vanilla/atom';
import { HitDiceType } from '../types';
import { useAtom } from 'jotai/index';
import React from 'react';
import { Grid2 as Grid } from '@mui/material';
import { StandardNumberInput, StyledStandardTextField } from '../../shared';

const thinInputSx = { '& input': { fontWeight: 200 } };

export const HitDice = ({ hitDiceAtom }: { hitDiceAtom: PrimitiveAtom<HitDiceType> }) => {
  const [hitDice, setHitDice] = useAtom(hitDiceAtom);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setHitDice((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Grid container direction={'row'} size={12}>
      <Grid size={3}>
        {' '}
        <StandardNumberInput onChange={handleChange} name="level" value={hitDice.level} sx={thinInputSx} />
      </Grid>
      <Grid size={6}>
        <StyledStandardTextField disabled name="die" variant={'standard'} type={'text'} value={hitDice.die} />
      </Grid>
      <Grid size={3}>
        <StandardNumberInput onChange={handleChange} name="usage" value={hitDice.usage} sx={thinInputSx} />
      </Grid>
    </Grid>
  );
};
