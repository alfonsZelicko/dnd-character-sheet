import React from 'react';
import { CharacterPreview } from '../preview';
import { Inventory } from '../inventory';
import { PageContainer } from './PageContainer';
import { MainMenu } from '../../components/main-menu';
import TabPanel, { TabPanelProps } from '@mui/lab/TabPanel';
import { TabContext } from '@mui/lab';
import { mergeSx, scrollBackgroundSx, usePageNavigation } from '../../utils';
import { Box } from '@mui/material';
import { Rest } from '../rest';

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
          <TabPanel value={0} {...commonTabPanelProps()}>
            <CharacterPreview />
          </TabPanel>
          <TabPanel value={1} {...commonTabPanelProps({ sx: { width: '100%' } })}>
            <Inventory />
          </TabPanel>
          <TabPanel value={2} {...commonTabPanelProps()}>
            <Rest />
          </TabPanel>
        </PageContainer>
      </TabContext>
    </Box>
  );
};
