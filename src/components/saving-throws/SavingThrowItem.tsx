import { getAbilityAtom, getAbilityFullName } from '../abilities/atoms';
import { useAtom } from 'jotai/index';
import { Box, Checkbox, Grid2 as Grid, Grid2Props, Tooltip, Typography } from '@mui/material';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import BookIcon from '@mui/icons-material/Book';
import { StandardNumberInput, StyledStandardTextField } from '../shared';
import React, { ChangeEvent, useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { calculateAbilityModifier, formatWithPlusSign } from '../../features/utils';
import { Abilities } from '../abilities/types';
import { proficiencyBonusAtom } from '../simple-components';

type SavingThrowItemProps = { ability: Abilities; WrapperProps?: Grid2Props };

export const SavingThrowItem = ({ ability: _ability, WrapperProps }: SavingThrowItemProps) => {
  const [{ type: ability, score, modification, proficiency }, setAtom] = useAtom(getAbilityAtom(_ability));
  const proficiencyBonus = useAtomValue(proficiencyBonusAtom);
  const savingThrowValue = useMemo(
    () => calculateAbilityModifier(score) + (proficiency ? 1 : 0) * proficiencyBonus + +(modification || 0),
    [score, modification, proficiencyBonus, proficiency]
  );

  const handleAbProfChance = (event: ChangeEvent<HTMLInputElement>) => {
    setAtom((prev) => ({ ...prev, [event.target.name]: event.target.checked }));
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAtom((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  return (
    <Grid size={12} display={'inline-flex'} alignItems="center" sx={{ height: '25px' }} {...WrapperProps}>
      <Tooltip title={'Proficiency'}>
        <Checkbox
          name="proficiency"
          checked={proficiency}
          onChange={handleAbProfChance}
          icon={<BookOutlinedIcon />}
          checkedIcon={<BookIcon />}
        />
      </Tooltip>
      <StyledStandardTextField
        value={formatWithPlusSign(savingThrowValue)}
        size={'small'}
        fullWidth
        sx={{ width: '30px' }}
        variant={'standard'}
        disabled
      />
      <Tooltip title={getAbilityFullName(ability)}>
        <Typography paddingLeft={1} paddingRight={1} textTransform={'uppercase'} fontSize={'1.5rem'} fontWeight={700}>
          {ability}
        </Typography>
      </Tooltip>
      <Box width={30}>
        <StandardNumberInput
          value={modification || ''}
          onChange={handleChange}
          name="modification"
          placeholder={'+'}
          fullWidth
          variant={'standard'}
          type={'number'}
        />
      </Box>
    </Grid>
  );
};
