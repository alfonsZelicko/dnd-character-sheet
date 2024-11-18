import React, { ChangeEvent, useState } from 'react';
import { IncrementDecrementButtons } from './inc-dec-buttons';
import { ActionButtonType, BaseNumberInputType, NumberInputProps } from './types';
import { StyledStandardTextField, StyledTextField } from '../text-input';

const BaseNumberInput = ({ showIncButtons = true, onChange, value, anchorEl, setAnchorEl, restProps, InputComponent }: BaseNumberInputType) => {
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

    const currentValue = typeof value === 'number' ? value : 0;

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
      {showIncButtons && <IncrementDecrementButtons callAction={handleChange} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />}
      <InputComponent onFocus={handleFocus} onBlur={handleBlur} value={value} onChange={onChange} {...restProps} />
    </>
  );
};

const NumberInputBase = ({
  showIncButtons = true,
  onChange,
  value,
  InputComponent,
  ...restProps
}: NumberInputProps & {
  InputComponent: React.ElementType;
}) => {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & (HTMLInputElement | HTMLTextAreaElement)) | null>(null);

  return (
    <BaseNumberInput
      showIncButtons={showIncButtons}
      onChange={onChange}
      value={value as number}
      anchorEl={anchorEl}
      setAnchorEl={setAnchorEl}
      restProps={restProps}
      InputComponent={InputComponent}
    />
  );
};

export const NumberInput = (props: NumberInputProps) => <NumberInputBase {...props} type="number" InputComponent={StyledTextField} />;

export const StandardNumberInput = (props: NumberInputProps) => <NumberInputBase {...props} variant={'standard'} InputComponent={StyledStandardTextField} />;
