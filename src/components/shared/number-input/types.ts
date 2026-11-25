import { Grid2Props, TextFieldProps, TypographyProps } from '@mui/material';
import { ReactNode } from 'react';
import { TextFieldVariants } from '@mui/material/TextField/TextField';
import { IncDecButtonAddon } from './inc-dec-buttons/types';

export type InputPlacement = 'left' | 'right';

export type InputWrapperProps = Omit<Pick<Grid2Props, 'size'>, 'label'> & {
  children?: ReactNode;
  NumberInputProps?: TextFieldProps;
  inputPlacement?: InputPlacement;
  ContainerProps?: Grid2Props;
};

export type NumberInputProps = Omit<TextFieldProps, 'variant'> & {
  showIncButtons?: boolean;
  variant?: TextFieldVariants;
} & IncDecButtonAddon;

export type ActionButtonType = 1 | -1;

export type NumberLabelInputProps = Pick<Grid2Props, 'size'> & {
  NumberInputProps?: NumberInputProps;
  StyledLabelProps?: TypographyProps;
  label: ReactNode;
  inputPlacement?: InputPlacement;
};
