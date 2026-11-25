import { IncDecButtonsProps, WrapperProps } from './types';
import { Buttons } from './Buttons';
import React from 'react';
import { useAtomValue } from 'jotai';
import { showIncDecButtonsAtom } from './atoms';
import { Popover } from '@mui/material';
import { WrapperPaperSx } from './styles';
import Slider from '@mui/material/Slider';
import { mergeSx } from '../../../../utils';

export const Wrapper = ({ children, anchorEl, setAnchorEl, sx = {} }: WrapperProps) => {
  const showIncDecButtons = useAtomValue(showIncDecButtonsAtom);

  return (
    <Popover
      open={showIncDecButtons && Boolean(anchorEl)}
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
      disableEnforceFocus
      disableRestoreFocus
      slotProps={{
        paper: {
          className: 'popover-content',
          sx: mergeSx(WrapperPaperSx, sx),
        },
      }}
    >
      {children}
    </Popover>
  );
};

export const IncrementDecrementButtons = ({
  incDecButtonType,
  SliderProps,
  callAction,
  ...wrapperProps
}: IncDecButtonsProps) => {
  const isSlider = incDecButtonType === 'slider';
  const content = isSlider ? <Slider {...SliderProps} orientation="vertical" /> : <Buttons callAction={callAction} />;

  return (
    <Wrapper {...wrapperProps} sx={isSlider ? { height: 150, overflow: 'visible' } : undefined}>
      {content}
    </Wrapper>
  );
};
