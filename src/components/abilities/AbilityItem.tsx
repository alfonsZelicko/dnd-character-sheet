import React, { ChangeEvent } from 'react';
import { StyledPaper } from '../shared';
import { Box, Grid2 as Grid } from '@mui/material';
import { ellipsisWrapper } from '../../utils';
import { useAtom } from 'jotai';
import { AbilityModifierLabel, AbilityName, StyledAbilityInput } from './styledComponents';
import { Abilities, AbilityInputProps, AbilityItemType, AbilityUIProps } from './types';
import { calculateAbilityModifier, formatWithPlusSign, removeLeadingZeros } from '../../features/utils';
import { getAbilityAtom } from './atoms';
import { abilityInputContainer, abilityModifierBox, labelContainer } from './styles';

export const AbilityItemUi = ({ ability, handleChange, NumberInputProps }: AbilityUIProps) => {
  const modifier = calculateAbilityModifier(ability.score);

  return (
    <Grid container sx={{ position: 'relative' }}> 

      <Grid sx={abilityInputContainer}>
        <StyledAbilityInput
          value={removeLeadingZeros(ability.score) || ''}
          onChange={handleChange}
          {...NumberInputProps}
        />
      </Grid>
      <Grid size={12}>
        <StyledPaper sx={labelContainer}>
          <Box width={40} position={'relative'} sx={{ flexDirection: 'column' }}> 
            <AbilityName variant={'body1'} sx={ellipsisWrapper}>
              {ability.type}
            </AbilityName>
          </Box>
          <Box sx={abilityModifierBox}>
            <AbilityModifierLabel variant={'h3'}>
              {formatWithPlusSign(modifier)}
            </AbilityModifierLabel>
          </Box>
        </StyledPaper>
      </Grid>
    </Grid>
  );
};

export const AbilityItem = ({ ability: _ability, NumberInputProps }: AbilityInputProps) => {
  const [ability, setAbility] = useAtom<AbilityItemType>(getAbilityAtom(_ability as Abilities));
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAbility((prev: AbilityItemType) => ({ ...prev, score: +event.target.value }));
  };

  return <AbilityItemUi ability={ability} NumberInputProps={NumberInputProps} handleChange={handleChange} />;
};
