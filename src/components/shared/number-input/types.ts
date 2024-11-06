import { Grid2Props, TextFieldProps, TypographyProps } from '@mui/material';
import React, { ChangeEvent, ReactNode } from 'react';
import { InputPlacement } from './NumberInputWrapper';
import { TextFieldVariants } from '@mui/material/TextField/TextField';

export type NumberInputProps = Omit<TextFieldProps, 'variant'> & {
  showIncButtons?: boolean;
  variant?: TextFieldVariants;
};

export type BaseNumberInputType = {
  showIncButtons: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value: unknown;
  anchorEl: (EventTarget & (HTMLInputElement | HTMLTextAreaElement)) | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<(EventTarget & (HTMLInputElement | HTMLTextAreaElement)) | null>>;
  restProps: NumberInputProps;
  InputComponent: React.ElementType;
};

export type ActionButtonType = 1 | -1;

export type NumberLabelInputProps = Pick<Grid2Props, 'size'> & {
  NumberInputProps?: NumberInputProps;
  StyledLabelProps?: TypographyProps;
  label: ReactNode;
  inputPlacement?: InputPlacement;
};
