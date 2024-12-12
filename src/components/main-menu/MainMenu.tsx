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
  background: isAtime ? '#816e5b99' : '#816e5b29',
  '&.Mui-selected': { color: 'white' },
});

export const MainMenu = () => {
  const [page, setSearchParams] = usePageNavigation();

  const handleChangePage = (_event: React.SyntheticEvent, newPage: number) => {
    setSearchParams(newPage);
  };

  return (
    <TabList
      onChange={handleChangePage}
      aria-label="basic tabs example"
      variant="fullWidth"
      sx={{ borderBottom: '1px solid ' + MainColor }}
    >
      <Tab label="Character Preview" {...a11yProps(0)} sx={generateTabSx(page === 0)} />
      <Tab label="Inventory" {...a11yProps(1)} sx={generateTabSx(page === 1)} />
      <Tab label="... what next?" {...a11yProps(2)} sx={generateTabSx(page === 2)} />
    </TabList>
  );
};
