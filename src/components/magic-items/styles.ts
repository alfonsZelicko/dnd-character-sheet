import { SxProps, Theme } from '@mui/material';

export const magicItemHeaderSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
};

export const magicItemNameContainerSx: SxProps<Theme> = {
  flex: 1,
  minWidth: 0,
};

export const magicItemAttunementContainerSx: SxProps<Theme> = {
  flex: '0 0 auto',
};

export const magicItemAttunementLabelSx: SxProps<Theme> = {
  pr: 2,
};

export const magicItemNameInputSx: SxProps<Theme> = {
  '& input, .MuiSelect-select': {
    textAlign: 'left',
    fontWeight: 200,
    fontSize: '1rem',
  },
};
