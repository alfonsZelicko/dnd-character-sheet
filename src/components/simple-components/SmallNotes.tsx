import { useAtom } from 'jotai';
import { sensesAtom } from './atoms';
import React from 'react';
import { Box, TextFieldProps } from '@mui/material';
import { TextFieldVariants } from '@mui/material/TextField/TextField';
import { StyledPaper, StyledTextFieldArea } from '../shared';

export const SmallNotes = ({ ...restProps }: Omit<TextFieldProps, 'variant'> & { variant?: TextFieldVariants }) => {
  const [senses, setSenses] = useAtom(sensesAtom);
  return (
    <Box
      component={StyledPaper}
      sx={{
        display: 'flex',
        height: '100%',
      }}
    >
      <StyledTextFieldArea
        value={senses}
        onChange={(event) => setSenses(event.target.value)}
        name="sences"
        variant="outlined"
        fullWidth
        rows={5}
        placeholder="Some small important notes"
        multiline
        {...restProps}
      />
    </Box>
  );
};
