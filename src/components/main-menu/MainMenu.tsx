import { Tab, Tabs } from '@mui/material';
import { usePageNavigation } from '../../utils';
import React from 'react';
import { a11yProps, generateTabSx, MainMenuColorOpacity } from './shared';
import { SECTIONS } from '../../pages';

export const MainMenu = () => {
  const [page, setSearchParams] = usePageNavigation();

  const handleChangePage = (_event: React.SyntheticEvent, newPage: number) => {
    setSearchParams(newPage);
  };

  return (
    <Tabs
      value={page}
      onChange={handleChangePage}
      aria-label="basic tabs example"
      variant="fullWidth"
      sx={{
        borderBottom: `1px solid ${MainMenuColorOpacity}`,
        '& .MuiTabs-indicator': { height: '100%', zIndex: 1, background: MainMenuColorOpacity },
      }}
    >
      <Tab label={SECTIONS[0].label} {...a11yProps(0)} sx={generateTabSx} />
      <Tab label={SECTIONS[1].label} {...a11yProps(1)} sx={generateTabSx} />
    </Tabs>
  );
};
