import { Checkbox, Grid2 as Grid, Tooltip, Typography } from '@mui/material';
import React, { ChangeEvent, useMemo } from 'react';
import { ellipsisWrapper } from '../../utils';
import { StandardNumberInput } from '../shared';
import { useAtom, useAtomValue } from 'jotai';
import { getAbilityAtom, getAbilityFullName } from '../abilities/atoms';
import { skillAtom } from './atoms';
import { calculateAbilityModifier, formatWithPlusSign } from '../../features/utils';
import { ExpertiseAndProficiency } from './ExpertiseAndProficiency';
import { SkillItemProps } from './types';
import CasinoIcon from '@mui/icons-material/Casino';
import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import { proficiencyBonusAtom } from '../simple-components';

export const SkillItem = React.memo(({ skillName, type = 'basic' }: SkillItemProps) => {
  const [{ ability, proficiencyAndExpertise, modifier, advantage }, setSkill] = useAtom(skillAtom(skillName));
  const [{ score }] = useAtom(getAbilityAtom(ability));
  const proficiencyBonus = useAtomValue(proficiencyBonusAtom);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setSkill((prev) => ({
      ...prev,
      [name]:
        name === 'advantage' ? (prev.advantage === undefined ? true : prev.advantage ? false : undefined) : +value,
    }));
  };

  const calculatedBonus = useMemo(() => {
    let result = calculateAbilityModifier(score);
    result += proficiencyAndExpertise * proficiencyBonus;
    result += modifier || 0;

    return result;
  }, [score, modifier, proficiencyAndExpertise, proficiencyBonus]);

  const tooltipTitle = `${calculateAbilityModifier(score)}{${ability}}+${proficiencyBonus}{proficiencyBonus}*${proficiencyAndExpertise}{prof/exp}+${modifier}{modifier}`;

  return (
    <Grid container mb={0}>
      <Grid sx={{ flexGrow: 1, display: 'flex' }}>
        <ExpertiseAndProficiency skillName={skillName} />
        <Tooltip title={tooltipTitle} open={false}>
          <span>
            <StandardNumberInput
              disabled
              showIncButtons={false}
              name={'score'}
              value={formatWithPlusSign(calculatedBonus)}
              sx={{ width: '45px' }}
              variant={'standard'}
            />
          </span>
        </Tooltip>
        <Typography
          sx={ellipsisWrapper}
          variant="body1"
          fontSize={'1.2rem'}
          fontWeight={600}
          color={type === 'basic' ? 'primary' : 'textDisabled'}
        >
          {skillName}
          <Tooltip title={getAbilityFullName(ability)}>
            <span style={{ opacity: 0.7 }}> ({ability})</span>
          </Tooltip>
        </Typography>
      </Grid>
      <Grid sx={{ width: 40 }}>
        <Tooltip title={advantage ? 'Advantage' : advantage === undefined ? 'No Advantage' : 'Disadvantage'}>
          <Checkbox
            sx={{ transition: '0.3s all', transform: `rotate(${advantage === undefined ? '0deg' : '35deg'})` }}
            size={'small'}
            name={'advantage'}
            icon={<CasinoOutlinedIcon />}
            checkedIcon={<CasinoIcon />}
            indeterminateIcon={<IndeterminateCheckBoxOutlinedIcon />}
            onChange={handleChange}
            checked={advantage === true}
            indeterminate={advantage === undefined}
          />
        </Tooltip>
      </Grid>
      <Grid sx={{ width: 40 }}>
        <Tooltip title={'Bonuses from items/...'}>
          <div>
            <StandardNumberInput
              value={modifier ? formatWithPlusSign(modifier) : ''}
              name={'modifier'}
              onChange={handleChange}
              placeholder={'+'}
              fullWidth={false}
              sx={{ pr: 2 }}
              variant={'standard'}
            />
          </div>
        </Tooltip>
      </Grid>
    </Grid>
  );
});
