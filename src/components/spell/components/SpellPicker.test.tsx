import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useSpellFilter } from '../hooks/useSpellFilter';
import { Spell } from '../types';
import { SpellPicker } from './SpellPicker';
import React from 'react';

vi.mock('../hooks/useSpellFilter', () => ({
  useSpellFilter: vi.fn(),
}));

const mockSpells: Spell[] = [
  {
    name: 'Fireball',
    searchName: 'fireball',
    level: 3,
    school: 'V',
    classes: {
      fromClassList: [{ name: 'Wizard', source: 'PHB' }],
    },
  },
  {
    name: 'Shield',
    searchName: 'shield',
    level: 1,
    school: 'A',
    classes: {
      fromClassList: [{ name: 'Wizard', source: 'PHB' }],
    },
  },
];

describe('SpellPicker', () => {
  const mockHandleInputChange = vi.fn();
  const mockHandleChange = vi.fn();
  const mockReset = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useSpellFilter).mockReturnValue({
      options: [],
      inputValue: '',
      selectedSpell: null,
      handleInputChange: mockHandleInputChange,
      handleChange: mockHandleChange,
      reset: mockReset,
    });
  });

  it('should render autocomplete input', () => {
    render(<SpellPicker />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should call handleInputChange when typing into input', () => {
    render(<SpellPicker />);

    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'fire' } });

    expect(mockHandleInputChange).toHaveBeenCalledTimes(1);
    expect(mockHandleInputChange).toHaveBeenCalledWith(expect.anything(), 'fire', 'input');
  });

  it('should display options and call handleChange when an option is selected', () => {
    vi.mocked(useSpellFilter).mockReturnValue({
      options: mockSpells,
      inputValue: 'f',
      selectedSpell: null,
      handleInputChange: mockHandleInputChange,
      handleChange: mockHandleChange,
      reset: mockReset,
    });

    render(<SpellPicker />);

    const input = screen.getByRole('combobox');
    fireEvent.mouseDown(input);

    const option = screen.getByText('Fireball');
    expect(option).toBeInTheDocument();

    fireEvent.click(option);

    expect(mockHandleChange).toHaveBeenCalledTimes(1);
    expect(mockHandleChange).toHaveBeenCalledWith(expect.anything(), mockSpells[0], 'selectOption', expect.anything());
  });

  it('should display selected spell in input', () => {
    vi.mocked(useSpellFilter).mockReturnValue({
      options: mockSpells,
      inputValue: 'Fireball',
      selectedSpell: mockSpells[0],
      handleInputChange: mockHandleInputChange,
      handleChange: mockHandleChange,
      reset: mockReset,
    });

    render(<SpellPicker />);

    const input = screen.getByRole('combobox');
    expect(input).toHaveValue('Fireball');
  });
});
