import { BoxProps, TextFieldProps } from '@mui/material';
import { TextFieldVariants } from '@mui/material/TextField/TextField';
import { PrimitiveAtom } from 'jotai/vanilla/atom';
import { ElementType } from 'react';

interface ExtendedBoxProps extends BoxProps {
  component?: ElementType;
}

export type NoteProps = Omit<TextFieldProps, 'variant'> & {
  variant?: TextFieldVariants;
  WrapperProps?: ExtendedBoxProps;
} & (
  | { atom: PrimitiveAtom<string>; arrayIndex?: never }
  | { atom: PrimitiveAtom<string[]>; arrayIndex: number }
);
