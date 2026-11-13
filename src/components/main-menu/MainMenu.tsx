import { SxProps, Tab, Theme } from '@mui/material';
import { APP_PAGE_TABS, MainColor, usePageNavigation } from '../../utils';
import React from 'react';
import { TabList } from '@mui/lab';

const a11yProps = (page: string) => {
  return {
    id: `simple-tab-${page}`,
    'aria-controls': `simple-tabpanel-${page}`,
  };
};

const generateTabSx = (isActive: boolean): SxProps<Theme> => ({
  background: isActive
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
      variant="scrollable"
      scrollButtons="auto"
      allowScrollButtonsMobile
      sx={{
        borderBottom: '1px solid ' + MainColor,
        '& .MuiTab-root': {
          flexGrow: 1,
        },
      }}
    >
      {APP_PAGE_TABS.map(({ id, label }) => (
        <Tab key={id} label={label} value={id} {...a11yProps(label)} sx={generateTabSx(page === id)} />
      ))}
    </TabList>
  );
};
