import { useAtom } from 'jotai';
import { sensesAtom } from './atoms';
import React from 'react';
import { styled, TextField } from '@mui/material';

export const StyledTextFieldArea = styled(TextField)({
  '& .MuiInputBase-root': {
    p: 1,
    overflow: 'hidden',
    '& textarea': { fontSize: '1rem', p: 0, paddingTop: '0 !important', overflow: 'hidden' },
  },
});

export const Senses = () => {
  const [senses, setSenses] = useAtom(sensesAtom);
  return (
    <StyledTextFieldArea
      value={senses}
      onChange={(event) => setSenses(event.target.value)}
      name="sences"
      maxRows={5}
      placeholder="List of special sences"
      multiline
    />
  );
};
