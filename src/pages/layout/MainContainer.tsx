import React from 'react';
import { CharacterPreview } from '../preview';
import { Inventory } from '../inventory';
import { CreaturesPage } from '../creatures';
import { PageContainer } from './PageContainer';
import { MainMenu } from '../../components/main-menu';
import TabPanel, { TabPanelProps } from '@mui/lab/TabPanel';
import { TabContext } from '@mui/lab';
import { AppPages, mergeSx, scrollBackgroundSx, usePageNavigation } from '../../utils';
import { Box } from '@mui/material';
import { Options } from '../options';
import { SpellsPage } from '../spells';

/* merging tabPanelProps with some default SX, ...*/
const commonTabPanelProps = (props?: Omit<TabPanelProps, 'value'>): Omit<TabPanelProps, 'value'> => ({
  keepMounted: true,
  ...props,
  sx: mergeSx(
    {
      p: 0,
      alignSelf: 'stretch',
      alignContent: 'center',
    },
    props?.sx ? props.sx : {}
  ),
});

export const MainContainer = () => {
  const [page] = usePageNavigation();

  return (
    <Box sx={scrollBackgroundSx}>
      <TabContext value={page}>
        <MainMenu />
        <PageContainer>
          <TabPanel value={AppPages.CharacterPreview.id} {...commonTabPanelProps()}>
            <CharacterPreview />
          </TabPanel>
          <TabPanel value={AppPages.Inventory.id} {...commonTabPanelProps({ sx: { width: '100%' } })}>
            <Inventory />
          </TabPanel>
          <TabPanel value={AppPages.Creatures.id} {...commonTabPanelProps({ sx: { width: '100%' } })}>
            <CreaturesPage />
          </TabPanel>
          <TabPanel value={AppPages.Spells.id} {...commonTabPanelProps({ sx: { width: '100%' } })}>
            <SpellsPage />
          </TabPanel>
          <TabPanel value={AppPages.Options.id} {...commonTabPanelProps({ sx: { width: '100%' } })}>
            <Options />
          </TabPanel>
        </PageContainer>
      </TabContext>
    </Box>
  );
};
