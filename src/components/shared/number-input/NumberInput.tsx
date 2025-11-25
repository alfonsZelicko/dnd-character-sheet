import React, { ChangeEvent, useState } from 'react';
import { IncrementDecrementButtons } from './inc-dec-buttons';
import { ActionButtonType, NumberInputProps } from './types';
import { StyledStandardTextField, StyledTextField } from '../text-input';

const CombinedNumberInput = ({
  showIncButtons = true,
  onChange,
  value,
  InputComponent,
  ...restProps
}: NumberInputProps & {
  InputComponent: React.ElementType;
}) => {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & (HTMLInputElement | HTMLTextAreaElement)) | null>(null);

  const handleFocus = (event: any) => {
    setAnchorEl(event.currentTarget);

    if (restProps.onFocus) {
      restProps.onFocus(event);
    }
  };

  const handleBlur = (event: any) => {
    setTimeout(() => {
      if (!document.activeElement?.closest('.popover-content')) {
        setAnchorEl(null);
      }
    }, 0);

    if (restProps.onBlur) {
      restProps.onBlur(event);
    }
  };

  const handleChange = (action: ActionButtonType) => {
    if (!onChange) return;

    const currentValue = Number(value) || 0;

    const mockEvent = {
      target: {
        name: restProps.name,
        value: currentValue + action,
        type: restProps.type,
        id: restProps.id,
        disabled: restProps.disabled,
        checked: value === 0,
      },
      currentTarget: {
        ...anchorEl,
      },
    } as unknown as ChangeEvent<HTMLInputElement>;

    onChange(mockEvent);
  };

  return (
    <>
      {showIncButtons && (
        <IncrementDecrementButtons callAction={handleChange} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
      )}
      <InputComponent onFocus={handleFocus} onBlur={handleBlur} value={value} onChange={onChange} {...restProps} />
    </>
  );
};

// Example usage of the combined component instance
export const NumberInput = (props: NumberInputProps) => (
  <CombinedNumberInput {...props} type="number" InputComponent={StyledTextField} />
);

export const StandardNumberInput = (props: NumberInputProps) => (
  <CombinedNumberInput {...props} variant={'standard'} InputComponent={StyledStandardTextField} />
);
