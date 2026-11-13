import { describe, expect, it } from 'vitest';
import { storedOrDefault } from './storedDefaults';

describe('storedOrDefault', () => {
  it('uses the fallback when a persisted field is missing', () => {
    expect(storedOrDefault(undefined, [])).toEqual([]);
    expect(storedOrDefault(undefined, false)).toBe(false);
    expect(storedOrDefault(undefined, 0)).toBe(0);
  });

  it('keeps stored values, including empty and falsy ones', () => {
    expect(storedOrDefault([], [{ name: 'default' }])).toEqual([]);
    expect(storedOrDefault(false, true)).toBe(false);
    expect(storedOrDefault(0, 3)).toBe(0);
    expect(storedOrDefault('', 'fallback')).toBe('');
  });
});
