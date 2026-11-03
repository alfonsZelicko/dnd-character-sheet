import { describe, expect, it } from 'vitest';
import { calculateAbilityModifier, formatWithPlusSign, removeLeadingZeros } from './utils';

describe('character sheet utilities', () => {
  it.each([[1, -5], [9, -1], [10, 0], [11, 0], [12, 1], [20, 5]])(
    'calculates the ability modifier for score %i',
    (score, expected) => expect(calculateAbilityModifier(score)).toBe(expected)
  );

  it('formats positive, zero, and negative bonuses', () => {
    expect(formatWithPlusSign(3)).toBe('+3');
    expect(formatWithPlusSign(0)).toBe('0');
    expect(formatWithPlusSign(-2)).toBe('-2');
  });

  it('removes redundant leading zeros without changing zero itself', () => {
    expect(removeLeadingZeros('00042')).toBe('42');
    expect(removeLeadingZeros('0')).toBe('0');
    expect(removeLeadingZeros(7)).toBe('7');
  });
});
