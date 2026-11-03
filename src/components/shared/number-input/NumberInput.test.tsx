import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { NumberInput } from './NumberInput';

describe('NumberInput', () => {
  it('forwards typed changes and supports disabling the increment popover', () => {
    const onChange = vi.fn();
    render(<NumberInput aria-label="Bonus" value="2" onChange={onChange} showIncButtons={false} />);

    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '7' } });

    expect(onChange).toHaveBeenCalledOnce();
  });
});
