import { Box, Grid2 as Grid } from '@mui/material';
import {
  AbilityListView,
  AttackList,
  BaseStats,
  CharacterPreview as CharacterPicture,
  FeatList,
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
    <Grid container size={{ xs: 12, lg: 7 }}>
      <NameRaceBackground />
      <Grid container size={7.5} alignItems={'space-between'} justifyContent="flex-start">
        <BaseStats />
        <Grid id={'skills-and-abilities'} container size={12}>
          <Grid container size={12}>
            <Grid id={'ability-view'} flex={1} justifyContent={'space-between'} display={'flex'} flexDirection={'column'} maxWidth={100}>
              <AbilityListView />
            </Grid>
            <Grid id={'skills'} component={StyledPaper} minWidth={325} flex={1}>
              <SkillListView />
            </Grid>
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
      <Grid id="" container size={4.5} alignItems="flex-start">
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
            <SmallNotes rows={5} variant={'outlined'} />
          </Box>
        </Grid>
      </Grid>
    </Grid>
    <Grid container size={{ xs: 12, lg: 5 }} direction={'column'}>
      <Grid size={12}>
        <AttackList />
      </Grid>
      <Grid container size={12} direction={'row'}>
        <FeatList />
      </Grid>
    </Grid>
  </HalfPageContainer>
);
