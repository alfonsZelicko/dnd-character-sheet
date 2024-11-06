import { styled, TextField, Typography } from '@mui/material';
import { dottedBorder } from '../../../utils';

export const StyledTextField = styled(TextField)({
  width: '50px',
  height: '50px',
  border: '1.5px solid #846e5485',
  borderRadius: '0',
  boxShadow: '0 0 2px rgba(0,0,0,0.1)',
  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
    display: 'none',
  },
  '& input[type=number]': {
    MozAppearance: 'textfield',
  },
  '& input': {
    textAlign: 'center',
    paddingLeft: '0',
    paddingRight: '0',
    paddingTop: '13px !important',
    lineHeight: 1.5,
  },
});

export const StyledNumberField = styled(TextField)({
  mr: 2,
  input: {
    textAlign: 'center',
    fontSize: '1.3rem',
    paddingTop: '4px !important',
    paddingBottom: '0 !important',
    marginTop: '5px',
  },
  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
    display: 'none',
  },
});

export const StyledLabel = styled(Typography)({
  marginTop: '1px',
  padding: '4px 4px 0 4px',
  lineHeight: '1rem',
  border: dottedBorder,
  fontWeight: 400,
  textTransform: 'uppercase',
  height: '45px',
});
