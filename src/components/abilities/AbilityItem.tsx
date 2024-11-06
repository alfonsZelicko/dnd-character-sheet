import React, { ChangeEvent } from 'react';
import { StyledPaper } from '../shared';
import { Grid2 as Grid } from '@mui/material';
import { ellipsisWrapper } from '../../utils';
import { useAtom } from 'jotai';
import { AbilityModifierLabel, AbilityName, StyledAbilityInput } from './styledComponents';
import { Abilities, AbilityItemType } from './types';
import { calculateAbilityModifier, formatWithPlusSign } from '../../features/utils';
import { getAbilityAtom } from './atoms';
import { NumberInputProps } from '../shared/number-input/types';

type AbilityInputProps = {
  ability: Abilities;
  NumberInputProps?: NumberInputProps;
};

export const AbilityItem = ({ ability: _ability, NumberInputProps }: AbilityInputProps) => {
  const [ability, setAbility] = useAtom<AbilityItemType>(getAbilityAtom(_ability as Abilities));
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAbility((prev: AbilityItemType) => ({ ...prev, score: +event.target.value }));
  };

  return (
    // <Tooltip title={getAbilityFullName(ability.type)} arrow>
    <Grid container component={StyledPaper} size={12} alignItems={'flex-start'} sx={{ m: 1, mt: 0, mb: 2.5, mr: 0, py: 0 }}>
      <Grid size={12}>
        <AbilityName variant={'body1'} sx={ellipsisWrapper}>
          {ability.type}
        </AbilityName>
        <StyledAbilityInput value={ability.score || 0} onChange={handleChange} {...NumberInputProps} />
      </Grid>
      <Grid size={12}>
        <AbilityModifierLabel variant={'h3'}>{formatWithPlusSign(calculateAbilityModifier(ability.score))}</AbilityModifierLabel>
      </Grid>
    </Grid>
    // </Tooltip>
  );
};
