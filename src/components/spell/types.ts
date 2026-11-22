import { AutocompleteProps } from '@mui/material';
import ShieldTwoToneIcon from '@mui/icons-material/ShieldTwoTone';
import TravelExploreTwoToneIcon from '@mui/icons-material/TravelExploreTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import PsychologyTwoToneIcon from '@mui/icons-material/PsychologyTwoTone';
import WhatshotTwoToneIcon from '@mui/icons-material/WhatshotTwoTone';
import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone';
import BloodtypeTwoToneIcon from '@mui/icons-material/BloodtypeTwoTone';
import TransformTwoToneIcon from '@mui/icons-material/TransformTwoTone';
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
  A: { Icon: ShieldTwoToneIcon, color: '#4A90D9' },
  C: { Icon: TravelExploreTwoToneIcon, color: '#35B8A5' },
  D: { Icon: VisibilityTwoToneIcon, color: '#D6B44C' },
  E: { Icon: PsychologyTwoToneIcon, color: '#A477D4' },
  I: { Icon: VisibilityOffTwoToneIcon, color: '#A5A9C4' },
  N: { Icon: BloodtypeTwoToneIcon, color: '#A83D50' },
  T: { Icon: TransformTwoToneIcon, color: '#72A85A' },
  V: { Icon: WhatshotTwoToneIcon, color: '#E87535' },
};

export type SpellListItemProps = { level: number; spell: SpellAtom };

export type School = keyof typeof schoolList;

export type SpellAtom = {
  name: string;
  school: School;
  prepared: boolean;
};

export const SchoolName: Record<School, string> = Object.fromEntries(
  Object.entries(schoolList).map(([key, value]) => [key, value.label])
) as Record<School, string>;
