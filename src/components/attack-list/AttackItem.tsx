import { Grid2 as Grid, styled } from '@mui/material';
import React from 'react';
import { StyledPaper, StyledStandardTextField } from '../shared';
import { AttackItemProps } from './types';
import { useAtom } from 'jotai';
import { attackNameSx, commonPropsSx, noteSx } from './styles';

const commonProps = {
  variant: 'standard' as 'standard',
  sx: commonPropsSx,
  fullWidth: true,
};

const StyledGrid = styled(Grid)({
  marginTop: '-5px',
});

export const AttackItem = ({ attackAtom }: AttackItemProps) => {
  const [{ attackName, attackBonus, damage, damageType, range, note }, setAttack] = useAtom(attackAtom);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name: _propName, value } = event.target;
    setAttack((prev) => ({ ...prev, [_propName]: value }));
  };

  return (
    <Grid container size={12} spacing={1} component={StyledPaper} className={'paperItem'}>
      <Grid container size={12} sx={{ alignItems: 'center', flexWrap: 'nowrap' }}>
        <StyledGrid size={'grow'}>
          <StyledStandardTextField
            value={attackName}
            name={'attackName'}
            onChange={handleChange}
            {...commonProps}
            sx={attackNameSx}
          />
        </StyledGrid>
        <StyledGrid sx={{ width: '30px' }}>
          <StyledStandardTextField value={attackBonus} name={'attackBonus'} onChange={handleChange} {...commonProps} />
        </StyledGrid>
        <StyledGrid sx={{ width: '60px' }}>
          <StyledStandardTextField value={range} name={'range'} onChange={handleChange} {...commonProps} />
        </StyledGrid>
        <StyledGrid sx={{ width: '70px' }}>
          <StyledStandardTextField value={damage} name={'damage'} onChange={handleChange} {...commonProps} />
        </StyledGrid>
        <StyledGrid size={2}>
          <StyledStandardTextField value={damageType} name={'damageType'} onChange={handleChange} {...commonProps} />
        </StyledGrid>
      </Grid>
      <StyledGrid size={12}>
        <StyledStandardTextField value={note} name={'note'} onChange={handleChange} {...commonProps} sx={noteSx} />
      </StyledGrid>
    </Grid>
  );
};
