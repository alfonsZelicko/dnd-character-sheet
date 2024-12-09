import React, { ChangeEvent } from 'react';
import { StyledPaper } from '../shared';
import { Grid2 as Grid } from '@mui/material';
import { ellipsisWrapper } from '../../utils';
import { useAtom } from 'jotai';
import { AbilityModifierLabel, AbilityName, StyledAbilityInput } from './styledComponents';
import { Abilities, AbilityInputProps, AbilityItemType, AbilityUIProps } from './types';
import { calculateAbilityModifier, formatWithPlusSign, removeLeadingZeros } from '../../features/utils';
import { getAbilityAtom } from './atoms';

export const AbilityItemUi = ({ ability, handleChange, NumberInputProps }: AbilityUIProps) => {
  return (
    <Grid container component={StyledPaper} size={12} alignItems={'flex-start'} sx={{ margin: '0 0 10px 4px', p: 0 }}>
      <Grid container width={40} position={'relative'} direction={'column'}>
        <Grid size={12}>
          <AbilityName variant={'body1'} sx={ellipsisWrapper}>
            {ability.type}
          </AbilityName>
        </Grid>
        <Grid size={12}>
          <StyledAbilityInput
            value={removeLeadingZeros(ability.score) || 0}
            onChange={handleChange}
            {...NumberInputProps}
          />
        </Grid>
      </Grid>
      <Grid
        size={'grow'}
        sx={{
          height: '65px',
          display: 'flex',
          alignItems: 'flex-end',
          pr: 2,
        }}
      >
        <AbilityModifierLabel variant={'h3'}>
          {formatWithPlusSign(calculateAbilityModifier(ability.score))}
        </AbilityModifierLabel>
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
