import { MainColor } from '../../utils';
import { SxProps } from '@mui/material';

export const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

export const MainMenuColorOpacity = `${MainColor}99`;

export const generateTabSx: SxProps = {
  background: '#816e5b29',
  zIndex: 2,
  '&.Mui-selected': { color: 'white' },
};
