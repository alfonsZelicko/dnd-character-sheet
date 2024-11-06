import { Wrapper } from './Wrapper';
import { IncDecButtonsType } from './types';
import { Buttons } from './Buttons';
import React from 'react';

export const IncrementDecrementButtons = ({ callAction, ...restProps }: IncDecButtonsType) => (
  <Wrapper {...restProps}>
    <Buttons callAction={callAction} />
  </Wrapper>
);
