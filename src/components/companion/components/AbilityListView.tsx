import React, { ChangeEvent, useRef } from 'react';
import { useAtom } from 'jotai';
import { CompanionAbilityType } from '../types';
import { abilitiesAtom } from '../atoms';
import { Box, Grid2 as Grid, Typography } from '@mui/material';
import { StandardNumberInput } from '../../shared';
import { calculateAbilityModifier, formatWithPlusSign, removeLeadingZeros } from '../../../features/utils';

export const AbilityListView = () => {
  const [abilities, setAbilities] = useAtom(abilitiesAtom);
  const textFieldRef = useRef();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: CompanionAbilityType['type']
  ) => {
    const newValue = Number(event.target.value.split('/')[0]);

    const updatedAbilities = abilities.map((ability) =>
      ability.type === type ? { ...ability, score: newValue } : ability
    );

    setAbilities(updatedAbilities);
    requestAnimationFrame(() => {
      event.target.setSelectionRange(event.target.selectionStart, event.target.selectionStart);
    });
  };

  return (
    <>
      {abilities.map((ability, index) => (
        <Grid container size={12} spacing={2} direction={'row'}>
          <Typography variant={'h5'} textTransform={'uppercase'}>
            {ability.type}:
          </Typography>
          <Box width={55}>
            <StandardNumberInput
              // type={'number'}
              variant={'standard'}
              value={`${removeLeadingZeros(ability.score)}/${formatWithPlusSign(calculateAbilityModifier(ability.score)).padStart(2, ' ')}`}
              onChange={(e) => handleChange(e, ability.type)}
              sx={{ '& input': { fontWeight: 200, textAlign: 'right' }, mt: 0.2 }}
            />
          </Box>
        </Grid>
      ))}
    </>
  );

  /*  return (
      <>
        {abilities.map((ability, index) => (
          <AbilityItemUi
            key={ability.type + '_' + index}
            ability={{
              ...ability,
              modification: 0,
              proficiency: false,
            }}
            handleChange={(event) => handleChange(event, ability.type)}
          />
        ))}
      </>
    );*/
};
