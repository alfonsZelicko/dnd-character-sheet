import { act, renderHook } from '@testing-library/react';
import { SyntheticEvent } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useSpellFilter } from './useSpellFilter';

describe('useSpellFilter', () => {
  const dummyEvent = {} as SyntheticEvent;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with empty state', () => {
    const { result } = renderHook(() => useSpellFilter());

    expect(result.current.inputValue).toBe('');
    expect(result.current.selectedSpell).toBeNull();
    expect(result.current.options).toEqual([]);
  });

  it('should update inputValue and filter options', () => {
    const { result } = renderHook(() => useSpellFilter());

    act(() => {
      result.current.handleInputChange(dummyEvent, 'fireball');
    });

    expect(result.current.inputValue).toBe('fireball');
    expect(result.current.options.length).toBeGreaterThan(0);
    expect(result.current.options[0].searchName).toContain('fireball');
  });

  it('should return empty options for whitespace-only query', () => {
    const { result } = renderHook(() => useSpellFilter());

    act(() => {
      result.current.handleInputChange(dummyEvent, '   ');
    });

    expect(result.current.options).toEqual([]);
  });

  it('should update selectedSpell via handleChange', () => {
    const { result } = renderHook(() => useSpellFilter());
    const dummySpell = {
      name: 'Test Spell',
      searchName: 'test spell',
      level: 1,
      school: 'V' as const,
      classes: { fromClassList: [] },
    };

    act(() => {
      result.current.handleChange(dummyEvent, dummySpell);
    });

    expect(result.current.selectedSpell).toEqual(dummySpell);

    act(() => {
      result.current.handleChange(dummyEvent, null);
    });

    expect(result.current.selectedSpell).toBeNull();
  });

  it('should reset state correctly', () => {
    const { result } = renderHook(() => useSpellFilter());

    act(() => {
      result.current.handleInputChange(dummyEvent, 'fire');
    });

    expect(result.current.inputValue).toBe('fire');
    expect(result.current.options.length).toBeGreaterThan(0);

    act(() => {
      result.current.reset();
    });

    expect(result.current.inputValue).toBe('');
    expect(result.current.selectedSpell).toBeNull();
    expect(result.current.options).toEqual([]);
  });
});
