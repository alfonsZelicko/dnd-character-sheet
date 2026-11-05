import { SxProps, Tab, Theme } from '@mui/material';
import { MainColor, usePageNavigation } from '../../utils';
import React from 'react';
import { TabList } from '@mui/lab';

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const generateTabSx = (isAtime: boolean): SxProps<Theme> => ({
  background: isAtime
    ? 'color-mix(in srgb, var(--app-main-color, #816e5b) 60%, transparent)'
    : 'color-mix(in srgb, var(--app-main-color, #816e5b) 16%, transparent)',
  '&.Mui-selected': { color: 'white' },
});

export const MainMenu = () => {
  const [page, setSearchParams] = usePageNavigation();

  const handleChangePage = (_event: React.SyntheticEvent, newPage: string) => {
    setSearchParams(newPage);
  };

  return (
    <TabList
      onChange={handleChangePage}
      aria-label="basic tabs example"
      variant="fullWidth"
      sx={{ borderBottom: '1px solid ' + MainColor }}
    >
      <Tab label="Character Preview" value={'0'} {...a11yProps(0)} sx={generateTabSx(page === '0')} />
      <Tab label="InventoryList (beta)" value={'1'} {...a11yProps(1)} sx={generateTabSx(page === '1')} />
      <Tab label="Options" value={'2'} {...a11yProps(2)} sx={generateTabSx(page === '2')} />
      <Tab label="Creatures" value={'3'} {...a11yProps(3)} sx={generateTabSx(page === '3')} />
    </TabList>
  );
};
