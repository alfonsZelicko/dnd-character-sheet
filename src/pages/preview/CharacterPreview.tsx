import { Grid2 as Grid } from '@mui/material';
import {
  AbilityListView,
  Armor,
  AttackList,
  CharacterPreview as CharacterPicture,
  CurrentHitPoints,
  DeathSaves,
  Exhaustion,
  FeatList,
  FeatureList,
  HitDices,
  Initiative,
  Inspiration,
  LvlAndClass,
  MaxHitPoints,
  Name,
  PassivePerception,
  ProficiencyBonus,
  Race,
  SavingThrows,
  SkillList,
  SmallNotes,
  Speed,
  StyledPaper,
  TemporaryHitPoints,
} from '../../components';
import React from 'react';
import { HalfPageContainer } from '../layout';
import { mergedPaperListSx } from '../../utils';

export const CharacterPreview = () => (
  <HalfPageContainer>
    <Grid container size={{ xs: 12, lg: 7 }} direction={'column'}>
      <Grid container size={12}>
        {/*Name, etc...*/}
        <Grid size={{ xs: 4 }}>
          <Name />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Race />
        </Grid>
        <Grid size={{ xs: 2 }}>
          <Speed />
        </Grid>
      </Grid>

      <Grid container size={12} flexGrow={1}>
        <Grid container size={7}>
          {/*Left - Armor, etc... */}
          <Grid container size={12}>
            <Grid size={12}>
              <LvlAndClass />
            </Grid>
            <Grid size={4}>
              <Initiative />
            </Grid>
            <Grid size={4}>
              <ProficiencyBonus />
            </Grid>
            <Grid size={4}>
              <Armor />
            </Grid>
          </Grid>

          {/* left - abilities, skills, etc...*/}
          <Grid container size={12} alignContent={'space-between'}>
            <Grid justifyContent={'space-between'} display={'flex'} flexDirection={'column'} maxWidth={100}>
              <AbilityListView />
            </Grid>
            <Grid id={'skills'} component={StyledPaper} minWidth={325} size={'grow'}>
              <SkillList />
            </Grid>
            <Grid size={8}>
              <SavingThrows />
            </Grid>
            <Grid container size={4} spacing={2} alignContent={'space-between'}>
              <PassivePerception />
              <Inspiration />
            </Grid>
          </Grid>
        </Grid>

        {/* left - hp, character preview... */}
        <Grid container size={5}>
          <Grid container>
            <Grid container size={5.5} justifyContent={'space-between'}>
              <TemporaryHitPoints />
              <CurrentHitPoints />
              <MaxHitPoints />

              <Exhaustion />
            </Grid>
            <Grid container size={6.5} justifyContent={'space-between'}>
              <HitDices />
              <DeathSaves />
            </Grid>
            <Grid size={12}>
              <CharacterPicture />
            </Grid>
            <Grid size={12}>
              <SmallNotes rows={5} variant={'outlined'} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>

    <Grid container alignContent={'flex-start'} size={{ xs: 12, lg: 5 }}>
      <Grid size={{ xs: 8, lg: 12 }}>
        <AttackList />
      </Grid>
      <Grid container size={{ xs: 4, lg: 8 }}>
        <FeatureList />
      </Grid>
      <Grid
        container
        sx={mergedPaperListSx()}
        spacing={{ xs: 2, lg: 0 }}
        size={{ xs: 12, lg: 4 }}
        direction={{ xs: 'row', lg: 'column' }}
      >
        <FeatList GridProps={{ size: { xs: 4, lg: 12 }, className: 'paperItem' }} />
      </Grid>
      <Grid container size={12} height={415}>
        <Grid size={6}>
          <SmallNotes rows={15} variant={'outlined'} />
        </Grid>
        <Grid size={6}>
          <SmallNotes rows={15} variant={'outlined'} />
        </Grid>
      </Grid>
    </Grid>
  </HalfPageContainer>
);
