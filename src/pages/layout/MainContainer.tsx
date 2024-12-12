import React from 'react';
import { CharacterPreview } from '../preview';
import { Inventory } from '../inventory';
import { PageContainer } from './PageContainer';
import { MainMenu } from '../../components/main-menu';
import TabPanel from '@mui/lab/TabPanel';
import { TabContext } from '@mui/lab';
import { usePageNavigation } from '../../utils';
import { Box } from '@mui/material';

export const MainContainer = () => {
  const [page] = usePageNavigation();

  return (
    <Box
      sx={{
        backgroundImage: 'url(src/assets/app-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <TabContext value={page}>
        <MainMenu />
        <PageContainer>
          <TabPanel value={0} sx={{ p: 0 }} keepMounted>
            <CharacterPreview />
          </TabPanel>
          <TabPanel value={1} sx={{ p: 0 }} keepMounted>
            <Inventory />
          </TabPanel>
        </PageContainer>
      </TabContext>
    </Box>
  );
};
