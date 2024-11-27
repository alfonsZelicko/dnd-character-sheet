import { BoxProps, TextFieldProps } from '@mui/material';
import { TextFieldVariants } from '@mui/material/TextField/TextField';
import { PrimitiveAtom } from 'jotai/vanilla/atom';
import { ElementType } from 'react';

interface ExtendedBoxProps extends BoxProps {
  component?: ElementType;
}

export type NoteProps = Omit<TextFieldProps, 'variant'> & {
  variant?: TextFieldVariants;
  atom: PrimitiveAtom<string>;
  WrapperProps?: ExtendedBoxProps;
};
