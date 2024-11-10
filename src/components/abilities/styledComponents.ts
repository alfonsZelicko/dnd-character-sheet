import { styled, Typography } from '@mui/material';
import { NumberInput } from '../shared';
import { InputColor, MainColor, MainContentColor } from '../../utils';

export const StyledAbilityInput = styled(NumberInput)({
  position: 'absolute',
  transform: 'translate(-40%, 30%)',
  width: '4vw',
  height: '4vw',
  '& input': {
    background: MainContentColor,
    height: '2vw',
    fontSize: '1.7rem',
    color: MainColor,
    fontWeight: 400,
    paddingTop: '1.3vw !important',
  },
});

export const AbilityModifierLabel = styled(Typography)({
  color: InputColor,
  textAlign: 'right',
  fontWeight: 400,
  fontFamily: 'Special Elite',
  marginTop: '-1rem',
});

export const AbilityName = styled(Typography)({
  width: '100%',
  textTransform: 'uppercase',
  color: InputColor,
  fontSize: '1.3rem',
  paddingBottom: 1,
});
