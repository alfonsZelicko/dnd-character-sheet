import { Box, Grid2 as Grid } from '@mui/material';
import {
  AbilityListView,
  BaseStats,
  CharacterPreview as CharacterPicture,
  HpDeathSavesPasPerception,
  Inspiration,
  NameRaceBackground,
  PassivePerception,
  SavingThrows,
  SkillListView,
  SmallNotes,
  StyledPaper,
} from '../../components';
import React from 'react';
import { HalfPageContainer } from '../layout';

export const CharacterPreview = () => (
  <HalfPageContainer>
    <Grid container size={7}>
      <NameRaceBackground />
      <Grid container size={7} alignItems={'flex-start'} justifyContent="flex-start">
        <BaseStats />
        <Grid id={'skills-and-abilities'} container size={12}>
          <Grid id={'ability-view'} container size={3} gap={0} alignItems="flex-start" padding={0}>
            <AbilityListView />
          </Grid>
          <Grid id={'skills'} component={StyledPaper} size={9}>
            <SkillListView />
          </Grid>
          <Grid container size={8} component={StyledPaper}>
            <SavingThrows />
          </Grid>
          <Grid container size={4} spacing={2}>
            <PassivePerception />
            <Inspiration />
          </Grid>
        </Grid>
      </Grid>
      <Grid id="" container size={5} alignItems="flex-start">
        <Grid container size={12} sx={{ flexDirection: 'column', height: '100%' }}>
          <HpDeathSavesPasPerception />
          <CharacterPicture />
          <Box
            component={StyledPaper}
            sx={{
              width: '100%',
              flexGrow: 1,
            }}
          >
            <SmallNotes rows={5} />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  </HalfPageContainer>
);