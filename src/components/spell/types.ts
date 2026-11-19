import { AutocompleteProps } from '@mui/material';
import ShieldIcon from '@mui/icons-material/Shield';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PsychologyIcon from '@mui/icons-material/Psychology';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import TransformIcon from '@mui/icons-material/Transform';
import React from 'react';

export type SpellPickerProps = Omit<
  AutocompleteProps<Spell, false, false, false>,
  | 'options'
  | 'value'
  | 'inputValue'
  | 'onInputChange'
  | 'onChange'
  | 'getOptionLabel'
  | 'isOptionEqualToValue'
  | 'renderInput'
>;

export type Spell = {
  name: string;
  searchName: string;
  level: number;
  school: School;
  classes: {
    fromClassList: {
      name: string;
      source: string;
    }[];
  };
};

export type SpellFile = {
  spell?: Spell[];
};

export const schoolList = {
  A: { label: 'Abjuration' },
  C: { label: 'Conjuration' },
  D: { label: 'Divination' },
  E: { label: 'Enchantment' },
  I: { label: 'Illusion' },
  N: { label: 'Necromancy' },
  T: { label: 'Transmutation' },
  V: { label: 'Evocation' },
} as const;

type SchoolConfig = {
  Icon: React.ElementType;
  color: string;
};

export const schoolIconConfig: Record<School, SchoolConfig> = {
  A: { Icon: ShieldIcon, color: '#4A90D9' },
  C: { Icon: TravelExploreIcon, color: '#35B8A5' },
  D: { Icon: VisibilityIcon, color: '#D6B44C' },
  E: { Icon: PsychologyIcon, color: '#A477D4' },
  V: { Icon: WhatshotIcon, color: '#E87535' },
  I: { Icon: VisibilityOffIcon, color: '#A5A9C4' },
  N: { Icon: BloodtypeIcon, color: '#A83D50' },
  T: { Icon: TransformIcon, color: '#72A85A' },
};

export type School = keyof typeof schoolList;

export const SchoolName: Record<School, string> = Object.fromEntries(
  Object.entries(schoolList).map(([key, value]) => [key, value.label])
) as Record<School, string>;
