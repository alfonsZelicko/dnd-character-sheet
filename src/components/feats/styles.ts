import { SxProps, Theme } from '@mui/material';

export const FeatNameSx: SxProps<Theme> = {
  display: 'block',
  '& input': {
    textAlign: 'right',
    fontWeight: 200,
    padding: '0 !important',
  },
};
