import { Grid2 as Grid, Tooltip, Typography } from '@mui/material';
import React, { ChangeEvent, useMemo } from 'react';
import { ellipsisWrapper } from '../../utils';
import { StandardNumberInput } from '../shared';
import { useAtom, useAtomValue } from 'jotai';
import { getAbilityAtom, getAbilityFullName } from '../abilities/atoms';
import { skillAtom } from './atoms';
import { calculateAbilityModifier } from '../../features/utils';
import { proficiencyBonusAtom } from '../component-blocks';
import { ExpertiseAndProficiency } from './ExpertiseAndProficiency';
import { SkillItemProps } from './types';

export const SkillItem = React.memo(({ skillName, type = 'basic' }: SkillItemProps) => {
  const [{ ability, proficiencyAndExpertise, modifier }, setSkill] = useAtom(skillAtom(skillName));
  const [{ score }] = useAtom(getAbilityAtom(ability));
  const proficiencyBonus = useAtomValue(proficiencyBonusAtom);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setSkill((prev) => ({
      ...prev,
      modifier: +event.target.value,
    }));

  const calculatedBonus = useMemo(() => {
    let result = calculateAbilityModifier(score);
    result += proficiencyAndExpertise * proficiencyBonus;
    result += modifier;

    return result;
  }, [score, modifier, proficiencyAndExpertise, proficiencyBonus]);

  //const tooltipTitle = `${calculateAbilityModifier(score)}{${ability}}+${proficiencyBonus}{proficiencyBonus}*${proficiencyAndExpertise}{prof/exp}+${modifier}{modifier}`;

  return (
    <Grid container alignItems="flex-start" mb={0}>
      <Grid sx={{ flexGrow: 1, display: 'flex' }}>
        <ExpertiseAndProficiency skillName={skillName} />
        <StandardNumberInput showIncButtons={false} name={'score'} value={calculatedBonus} sx={{ width: '50px' }} variant={'standard'} />
        <Typography sx={ellipsisWrapper} variant="body1" fontSize={'1.2rem'} fontWeight={600} color={type === 'basic' ? 'primary' : 'textDisabled'}>
          {skillName}
          <Tooltip title={getAbilityFullName(ability)}>
            <span style={{ opacity: 0.7 }}> ({ability})</span>
          </Tooltip>
        </Typography>
      </Grid>
      <Grid sx={{ width: 40 }}>
        <StandardNumberInput
          value={modifier || ''}
          name={'modifier'}
          onChange={handleChange}
          placeholder={'+'}
          fullWidth={false}
          sx={{ pr: 2 }}
          variant={'standard'}
        />
      </Grid>
    </Grid>
  );
});
