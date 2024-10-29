import { SxProps, Theme } from '@mui/material';

export const wrapperSx = (maxWidth?: number): SxProps<Theme> => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  width: '100%',
  ...(maxWidth && maxWidth >= 0 ? { maxWidth } : {}),
});
