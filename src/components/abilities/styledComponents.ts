import { styled, Typography } from '@mui/material';
import { NumberInput } from '../shared';
import { InputColor, MainColor } from '../../utils';

export const StyledAbilityInput = styled(NumberInput)({
  transform: 'translate(-5px, 5px)',
  width: '40px',
  height: '41px',
  '& input': {
    background: 'url("src/assets/app-bg.png") center center',
    height: '22px',
    fontSize: '1.7rem',
    color: MainColor,
    fontWeight: 400,
    paddingTop: '13px !important',
  },
});

export const AbilityModifierLabel = styled(Typography)({
  color: InputColor,
  textAlign: 'right',
  fontWeight: 400,
  fontFamily: 'Special Elite',
});

export const AbilityName = styled(Typography)({
  width: '100%',
  textTransform: 'uppercase',
  color: InputColor,
  fontSize: '1.3rem',
  paddingBottom: 1,
});
