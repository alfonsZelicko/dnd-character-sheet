import { Grid2 as Grid } from '@mui/material';
import React from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { NumberLabelInput, NumberTextFieldInput } from '../shared';
import { armorAtom, classAtom, initiativeAtom, levelAtom, proficiencyBonusAtom } from './atoms';
import { dexterityAtom } from '../abilities/atoms';
import { calculateAbilityModifier } from '../../features/utils';

export const LvlAndClass = () => {
  const [level, setLevel] = useAtom(levelAtom);
  const [classes, setClasses] = useAtom(classAtom);

  return (
    <NumberTextFieldInput
      TextFieldProps={{ value: classes, onChange: (e) => setClasses(e.target.value), label: 'Level & class', fullWidth: true }}
      NumberInputProps={{ value: level, onChange: (e) => setLevel(+e.target.value) }}
    />
  );
};

export const Armor = () => {
  const [armor, setArmor] = useAtom(armorAtom);
  return <NumberLabelInput NumberInputProps={{ value: armor, onChange: (e) => setArmor(+e.target.value) }} label={'Armor Class'} />;
};

export const ProficiencyBonus = () => {
  const [profBonus, setProfBonus] = useAtom(proficiencyBonusAtom);
  return (
    <NumberLabelInput
      NumberInputProps={{
        value: profBonus,
        onChange: (e) => setProfBonus(+e.target.value > 1 ? +e.target.value : 1),
      }}
      label={'Proficiency bonus'}
    />
  );
};

export const Initiative = () => {
  const [initiative, setInitiative] = useAtom(initiativeAtom);
  const { score: dexterityScore } = useAtomValue(dexterityAtom);
  return (
    <NumberLabelInput
      NumberInputProps={{
        value: initiative !== null ? initiative : calculateAbilityModifier(dexterityScore),
        onChange: (e) => setInitiative(e.target.value === '' ? null : +e.target.value),
      }}
      label={'Initiative'}
    />
  );
};

export const BaseStats = () => {
  return (
    <>
      <Grid size={12}>
        <LvlAndClass />
      </Grid>
      <Grid size={4}>
        <Initiative />
      </Grid>
      <Grid size={4}>
        <ProficiencyBonus />{' '}
      </Grid>
      <Grid size={4}>
        <Armor />
      </Grid>
    </>
  );
};
