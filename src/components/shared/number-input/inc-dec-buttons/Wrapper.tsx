import { Popover } from '@mui/material';
import React from 'react';
import { WrapperType } from './types';
import { WrapperPaperSx } from './styles';

export const Wrapper = ({ children, anchorEl, setAnchorEl }: WrapperType) => (
  <Popover
    open={document.activeElement == anchorEl}
    anchorEl={anchorEl}
    onClose={() => setAnchorEl(null)}
    anchorOrigin={{
      vertical: 'center',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'center',
      horizontal: 'left',
    }}
    disableAutoFocus
    slotProps={{
      paper: {
        sx: WrapperPaperSx,
      },
    }}
  >
    {children}
  </Popover>
);
