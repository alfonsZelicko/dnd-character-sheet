import React, { useRef } from 'react';
import { MainMenu } from '../../components/main-menu';
import { mergeSx, usePageNavigation, useSmoothScrollToSlide } from '../../utils';
import { Box, Grid2 as Grid } from '@mui/material';
import { PageContainer } from './PageContainer';
import { horizontalContainerSx, imageBackgroundSx, slideSx } from './styles';
import { CharacterPreview } from '../preview';
import { Inventory } from '../inventory';

export const SECTIONS = [
  {
    component: <CharacterPreview />,
    label: 'Character Preview',
  },
  {
    component: <Inventory />,
    label: 'Inventory',
  },
];
export const MainContainer = () => {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [page] = usePageNavigation(pageRef);
  useSmoothScrollToSlide(page, containerRef);

  return (
    <>
      <MainMenu />
      <PageContainer ref={pageRef}>
        <Box ref={containerRef} sx={horizontalContainerSx}>
          <Grid
            container
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: `${SECTIONS.length * 100}%`,
            }}
          >
            {SECTIONS.map(({ component }, index) => (
              <Grid key={index} sx={mergeSx(slideSx, imageBackgroundSx)} padding={1}>
                <Box sx={{ height: '100%' }}>{component}</Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </PageContainer>
    </>
  );
};
