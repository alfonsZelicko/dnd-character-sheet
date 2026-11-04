import { Grid2 as Grid, IconButton, styled, Tooltip } from '@mui/material';
import React from 'react';
import { StyledPaper, StyledStandardTextField } from '../shared';
import { AttackItemProps } from './types';
import { useAtom } from 'jotai';
import { attackNameSx, commonPropsSx, noteSx } from './styles';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const commonProps = {
  variant: 'standard' as 'standard',
  sx: commonPropsSx,
  fullWidth: true,
};

const StyledGrid = styled(Grid)({
  marginTop: '-5px',
});

// TODO: optimize rendering to rerender only changed components

export const WeaponItem = ({ attackAtom, onRemove }: AttackItemProps) => {
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
            placeholder={'Weapon Name'}
            value={attackName}
            name={'attackName'}
            onChange={handleChange}
            {...commonProps}
            sx={attackNameSx}
          />
        </StyledGrid>
        <StyledGrid sx={{ width: '30px' }}>
          <StyledStandardTextField
            placeholder={'⚂'}
            value={attackBonus}
            name={'attackBonus'}
            onChange={handleChange}
            {...commonProps}
          />
        </StyledGrid>
        <StyledGrid sx={{ width: '60px' }}>
          <StyledStandardTextField
            placeholder={'Range'}
            value={range}
            name={'range'}
            onChange={handleChange}
            {...commonProps}
          />
        </StyledGrid>
        <StyledGrid sx={{ width: '70px' }}>
          <StyledStandardTextField
            placeholder={'DMG'}
            value={damage}
            name={'damage'}
            onChange={handleChange}
            {...commonProps}
          />
        </StyledGrid>
        <StyledGrid size={2.5}>
          <StyledStandardTextField
            placeholder={'dmg type'}
            value={damageType}
            name={'damageType'}
            onChange={handleChange}
            {...commonProps}
          />
        </StyledGrid>
        {onRemove && (
          <Grid size="auto">
            <Tooltip title="Delete weapon">
              <IconButton size="small" aria-label={`Remove ${attackName || 'weapon'}`} onClick={onRemove}>
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Grid>
        )}
      </Grid>
      <StyledGrid size={12}>
        <StyledStandardTextField
          placeholder={'Weapon Description'}
          value={note}
          name={'note'}
          onChange={handleChange}
          {...commonProps}
          sx={noteSx}
        />
      </StyledGrid>
    </Grid>
  );
};
