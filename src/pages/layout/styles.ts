import { SxProps } from '@mui/material';
import { MainContentColor } from '../../utils';

export const horizontalContainerSx: SxProps = {
  overflowX: 'hidden',
  whiteSpace: 'nowrap',
  width: '100vw',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
};

export const imageBackgroundSx: SxProps = {
  backgroundColor: MainContentColor,
  backgroundImage: 'url(src/assets/app-bg.png)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

export const mainPageContainerSx: SxProps = {
  alignItems: 'center',
  minHeight: 'calc(100vh - 49px)',
  width: '100%',
  display: 'flex',
  backgroundColor: 'transparent',
};

export const slideSx: SxProps = { width: '100vw', flexShrink: 0 };
