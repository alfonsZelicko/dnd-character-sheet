import { getAbilityAtom, getAbilityFullName } from '../abilities/atoms';
import { useAtom } from 'jotai/index';
import { Box, Checkbox, Grid2 as Grid, Tooltip, Typography } from '@mui/material';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import BookIcon from '@mui/icons-material/Book';
import { StandardNumberInput } from '../shared';
import React, { ChangeEvent, useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { calculateAbilityModifier } from '../../features/utils';
import { Abilities } from '../abilities/types';
import { proficiencyBonusAtom } from '../component-blocks';

type SavingThrowItemProps = { ability: Abilities };

export const SavingThrowItem = ({ ability: _ability }: SavingThrowItemProps) => {
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
    <>
      <Grid size={12} display={'inline-flex'} alignItems="center">
        <Tooltip title={'Proficiency'}>
          <Checkbox name="proficiency" checked={proficiency} onChange={handleAbProfChance} icon={<BookOutlinedIcon />} checkedIcon={<BookIcon />} />
        </Tooltip>
        <StandardNumberInput value={savingThrowValue} size={'small'} fullWidth sx={{ width: '30px' }} variant={'standard'} />
        {/*<Typography variant={'h6'} sx={{ fontSize: '1.4em', width: 40, textAlign: 'center', color: 'rgba(0,0,0,0.7)' }}>
          {formatWithPlusSign(savingThrowValue)}
        </Typography>*/}
        <Tooltip title={getAbilityFullName(ability)}>
          <Typography paddingLeft={1} paddingRight={1} textTransform={'uppercase'} fontSize={'1.5rem'} fontWeight={700}>
            {ability}
          </Typography>
        </Tooltip>
        <Box>
          <Tooltip title={'Modification'}>
            <span>
              <StandardNumberInput value={modification || ''} onChange={handleChange} name="modification" placeholder={'+'} fullWidth sx={{ width: '30px' }} variant={'standard'} />
            </span>
          </Tooltip>
        </Box>
      </Grid>
    </>
  );
};
