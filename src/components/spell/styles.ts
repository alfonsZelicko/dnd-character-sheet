import { SxProps, Theme } from '@mui/material';

export const spellPickerSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  borderBottom: 1,
  borderColor: 'divider',
  '& .MuiAutocomplete-root': {
    flex: 1,
  },
  '& .MuiInput-root:before, & .MuiInput-root:after': {
    display: 'none',
  },
};

export const textFieldSx: SxProps<Theme> = {
  '& input::placeholder, & input': {
    fontWeight: 200,
    fontSize: '1.2rem',
    marginTop: '-25px',
  },
};

export const buttonSx: SxProps<Theme> = {
  borderLeft: 1,
  borderColor: 'divider',
  borderRadius: 0,
  alignSelf: 'stretch',
  px: 2,
};

export const autocompleteOptionLabelNameSx: SxProps<Theme> = { fontSize: '1.3rem', textAlign: 'left', flex: 1, pl: 2 };

export const counterInputSx = { '& input': { fontWeight: 200, fontFamily: 'monospace', fontSize: '0.9rem' } };
export const infiniteInputSx = {
  ...counterInputSx,
  '& input::placeholder': { opacity: 1, color: 'text.primary', fontWeight: 600 },
};
