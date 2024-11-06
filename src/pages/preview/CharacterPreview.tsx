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

export const StyledTextFieldArea = styled(TextField)({'& .MuiInputBase-root': {
    p: 1,
    overflow: 'hidden',
    '& textarea': { fontSize: '1rem', p:0, paddingTop: '0 !important',overflow: 'hidden', }
  }})

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
            <Typography></Typography>
            <StyledTextFieldArea name='sences' maxRows={5} placeholder="List of special sences" multiline />
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
