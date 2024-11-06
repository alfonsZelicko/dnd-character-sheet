import { Dispatch, ReactNode, SetStateAction } from 'react';
import { ActionButtonType } from '../types';

export type IncDecButtonsType = {
  callAction(setNew: ActionButtonType): void; //Dispatch<SetStateAction<number>>;
  anchorEl: (EventTarget & (HTMLInputElement | HTMLTextAreaElement)) | null;
  setAnchorEl: Dispatch<SetStateAction<(EventTarget & (HTMLInputElement | HTMLTextAreaElement)) | null>>;
};

export type WrapperType = Omit<IncDecButtonsType, 'callAction'> & { children: ReactNode };

export type ButtonsType = Pick<IncDecButtonsType, 'callAction'>;
