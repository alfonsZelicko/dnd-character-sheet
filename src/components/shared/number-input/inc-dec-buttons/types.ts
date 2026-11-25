import { Dispatch, ReactNode, SetStateAction } from 'react';
import { SliderProps } from '@mui/material/Slider';
import { ActionButtonType } from '../types';
import { SxProps } from '@mui/material';

export type IncDecButtonType = 'button' | 'slider';

export type IncDecButtonAddon = {
  incDecButtonType?: IncDecButtonType;
  SliderProps?: SliderProps;
};

export type IncDecButtonsProps = {
  callAction(setNew: ActionButtonType): void;
  anchorEl: (EventTarget & (HTMLInputElement | HTMLTextAreaElement)) | null;
  setAnchorEl: Dispatch<SetStateAction<(EventTarget & (HTMLInputElement | HTMLTextAreaElement)) | null>>;
} & IncDecButtonAddon;

export type ButtonsProps = Pick<IncDecButtonsProps, 'callAction'>;

export type WrapperProps = Omit<IncDecButtonsProps, 'callAction'> & {
  children: ReactNode;
  sx?: SxProps;
};
