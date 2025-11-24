import { IncDecButtonsType, WrapperType } from './types';
import { Buttons } from './Buttons';
import React from 'react';
import { useAtomValue } from 'jotai/index';
import { showIncDecButtonsAtom } from './atoms';
import { Popover } from '@mui/material';
import { WrapperPaperSx } from './styles';

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

/* TODO: it is not working well - need to repair it again*/
export const IncrementDecrementButtons = ({ callAction, ...restProps }: IncDecButtonsType) => (
  <Wrapper {...restProps}>
    <Buttons callAction={callAction} />
  </Wrapper>
);
