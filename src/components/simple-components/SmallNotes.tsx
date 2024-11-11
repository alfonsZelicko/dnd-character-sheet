import { useAtom } from 'jotai';
import { sensesAtom } from './atoms';
import React from 'react';
import { styled, TextField, TextFieldProps } from '@mui/material';

export const StyledTextFieldArea = styled(TextField)({
  '& .MuiInputBase-root': {
    padding: '4px',
    overflow: 'hidden',
    '& textarea': {
      fontSize: '1rem',
      p: 0,
      paddingTop: '0 !important',
      overflow: 'hidden',
      backgroundImage: `
        repeating-linear-gradient(
          to bottom,
          transparent,
          transparent calc(1.3rem - 1px),
          #d3d3d3 calc(1.3rem - 1px),
          #d3d3d3 1.3rem
        )
      `,
      backgroundSize: '100% 1.5rem',
    },
  },
});

export const SmallNotes = ({ ...restProps }: TextFieldProps) => {
  const [senses, setSenses] = useAtom(sensesAtom);
  return (
    <StyledTextFieldArea
      value={senses}
      onChange={(event) => setSenses(event.target.value)}
      name="sences"
      fullWidth
      rows={5}
      maxRows={5}
      placeholder="Some small important notes"
      multiline
      {...restProps}
    />
  );
};
