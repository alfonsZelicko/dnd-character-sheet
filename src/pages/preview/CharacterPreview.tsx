import { Grid2 as Grid, styled, TextField } from '@mui/material';
import {
  AbilityListView,
  BaseStats,
  Exhaustion,
  HitDices,
  HpDeathSavesPasPerception,
  Inspiration,
  NameRaceBackground,
  SavingThrows,
  Senses,
  SkillListView,
  StyledPaper,
} from '../../components';
import React from 'react';
import { HalfPageContainer } from '../layout';

export const CharacterPreview = () => (
  <HalfPageContainer>
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
        <Grid container size={12}>
          <Grid size={4} component={StyledPaper} padding={0}>
            <Senses />
          </Grid>
          <Grid container component={StyledPaper} size={8}>
            <SavingThrows />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    <Grid id="" container size={5} alignItems="flex-start">
      <Grid container size={12}>
        <HpDeathSavesPasPerception />
        <Grid container size={12}>
          <Grid size={7}>
            <Exhaustion />
          </Grid>
          <Grid size={5}>
            <Inspiration />
          </Grid>
        </Grid>
        <Grid container size={12}>
          <Grid size={6}>
            <HitDices />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </HalfPageContainer>
);
