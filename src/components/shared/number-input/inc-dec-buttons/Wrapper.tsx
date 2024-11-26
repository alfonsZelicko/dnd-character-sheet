import { Popover } from '@mui/material';
import React from 'react';
import { WrapperType } from './types';
import { WrapperPaperSx } from './styles';
import { useAtomValue } from 'jotai';
import { showIncDecButtonsAtom } from './atoms';

export const Wrapper = ({ children, anchorEl, setAnchorEl }: WrapperType) => {
  const showIncDecButtons = useAtomValue(showIncDecButtonsAtom);

  return (
    <Popover
      open={showIncDecButtons && document.activeElement == anchorEl}
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
};
