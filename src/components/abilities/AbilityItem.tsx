import React, { ChangeEvent } from 'react';
import { StyledPaper } from '../shared';
import { Box, Grid2 as Grid } from '@mui/material';
import { ellipsisWrapper } from '../../utils';
import { useAtom } from 'jotai';
import { AbilityModifierLabel, AbilityName, StyledAbilityInput } from './styledComponents';
import { Abilities, AbilityInputProps, AbilityItemType, AbilityUIProps } from './types';
import { calculateAbilityModifier, formatWithPlusSign, removeLeadingZeros } from '../../features/utils';
import { getAbilityAtom } from './atoms';

export const AbilityItemUi = ({ ability, handleChange, NumberInputProps }: AbilityUIProps) => {
  const modifier = calculateAbilityModifier(ability.score);

  const paperContainerStyles = {
    margin: '0 0 10px 4px',
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, calc(0% + 36px) 100%, calc(0% + 36px) 35px, 0 35px)',
    p: 0,
    '&:last-child': {
      marginBottom: 0
    }
  };

  return (
    <Grid container sx={{ position: 'relative' }}> 

      <Grid sx={{ 
          position: 'absolute', 
          zIndex: 2, 
          left: '5px', 
          top: '30px', 
          width: 30 
      }}>
        <StyledAbilityInput
          value={removeLeadingZeros(ability.score) || ''}
          onChange={handleChange}
          {...NumberInputProps}
        />
      </Grid>
      <Grid size={12}>
        <StyledPaper
          sx={{
            ...paperContainerStyles,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}
        >
          <Box width={40} position={'relative'} sx={{ flexDirection: 'column' }}> 
            <AbilityName variant={'body1'} sx={ellipsisWrapper}>
              {ability.type}
            </AbilityName>
          </Box>
          <Box
            sx={{
              height: '65px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              pr: 2,
              flexGrow: 1,
            }}
          >
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
