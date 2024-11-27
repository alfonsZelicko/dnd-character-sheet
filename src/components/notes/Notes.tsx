import { Box } from '@mui/material';
import { useAtom } from 'jotai/index';
import { StyledPaper, StyledTextFieldArea } from '../shared';
import React from 'react';
import { NoteProps } from './types';

export function Notes({ atom, WrapperProps, ...restProps }: NoteProps) {
  const [value, setValue] = useAtom(atom);
  return (
    <Box
      component={StyledPaper}
      sx={{
        display: 'flex',
        height: '100%',
      }}
      {...WrapperProps}
    >
      <StyledTextFieldArea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        variant="outlined"
        fullWidth
        rows={5}
        placeholder="Some notes"
        multiline
        {...restProps}
      />
    </Box>
  );
}
