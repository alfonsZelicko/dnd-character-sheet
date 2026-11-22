import { Grid2 as Grid } from '@mui/material';
import {
  AbilityListView,
  Armor,
  AttackList,
  CharacterImage as CharacterPicture,
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
  SmallInventory,
  SmallNotes,
  Speed,
  StyledPaper,
  TemporaryHitPoints,
} from '../../components';
import React from 'react';
import { CharacterPictureAtom } from '../../components/character-image/atoms';
import { abilityPreviewContainerSx, hpPreviewContainerSx } from './styles';
import { SpellSlotCounter } from '../../components/spell';

export const CharacterPreview = () => (
  <Grid container size={{ md: 12 }} spacing={1}>
    <Grid container size={{ xs: 12, lg: 7 }} direction={'column'}>
      <Grid container size={12}>
        {/*Name, etc...*/}
        <Grid size={{ xs: 12, md: 6 }}>
          <Name />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <LvlAndClass />
        </Grid>
      </Grid>

      <Grid container size={12} flexGrow={1}>
        <Grid container size={{ xs: 12, md: 7 }}>
          {/*Left - Armor, etc...*/}
          <Grid container size={12}>
            <Grid size={8}>
              <Race />
            </Grid>
            <Grid size={4}>
              <Speed />
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
          {/*left - abilities, skills, etc...*/}
          <Grid container size={12} alignContent={'space-between'}>
            <Grid container size={{ xs: 12, md: 'auto' }} sx={abilityPreviewContainerSx}>
              <AbilityListView />
            </Grid>

            <Grid id="skills" component={StyledPaper} minWidth={320} size={{ xs: 12, md: 'grow' }}>
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
        {/*left - hp, character preview...*/}
        <Grid container size={{ xs: 12, md: 5 }}>
          <Grid container size={12} sx={hpPreviewContainerSx}>
            <Grid sx={{ gridArea: 'temp' }}>
              <TemporaryHitPoints />
            </Grid>

            <Grid sx={{ gridArea: 'current' }}>
              <CurrentHitPoints />
            </Grid>

            <Grid sx={{ gridArea: 'max' }}>
              <MaxHitPoints />
            </Grid>

            <Grid sx={{ gridArea: 'exhaustion' }}>
              <Exhaustion />
            </Grid>

            <Grid sx={{ gridArea: 'death', display: 'flex' }}>
              <DeathSaves />
            </Grid>

            <Grid container sx={{ gridArea: 'hitdices', display: 'flex' }}>
              <Grid size={12}>
                <HitDices headerMode={'hide'} />
              </Grid>
              <Grid size={12}>
                <SpellSlotCounter headerMode={'no-button'} showCantrips={true} display="usage-icons" />
              </Grid>
            </Grid>
          </Grid>
          <Grid size={12}>
            <CharacterPicture atom={CharacterPictureAtom} />
          </Grid>
          <Grid size={12} sx={{ mt: 'auto' }}>
            <SmallNotes rows={5} variant={'outlined'} placeholder={'Character description'} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>

    <Grid container alignContent={'space-between'} size={{ xs: 12, lg: 5 }}>
      <Grid size={{ xs: 12 }}>
        <AttackList />
      </Grid>
      <Grid container size={{ xs: 12, md: 7 }}>
        <FeatureList />
      </Grid>
      <Grid container size={{ xs: 12, md: 5 }}>
        <FeatList />
      </Grid>
      <Grid container size={12} component={StyledPaper}>
        <SmallInventory />
      </Grid>
    </Grid>
  </Grid>
);
