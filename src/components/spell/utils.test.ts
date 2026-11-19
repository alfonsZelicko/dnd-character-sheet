import { describe, expect, it } from 'vitest';
import { getSpellLevelLabel } from './utils';

describe('getSpellLevelLabel', () => {
  it('uses the matching name for spell list and slot counter contexts', () => {
    expect(getSpellLevelLabel(0, 'spell-list')).toBe('Cantrips');
    expect(getSpellLevelLabel(0, 'spell-slots')).toBe('Cantrips');
    expect(getSpellLevelLabel(1, 'spell-list')).toBe('Spells of 1st level');
    expect(getSpellLevelLabel(1, 'spell-slots')).toBe('1st level spell slot');
    expect(getSpellLevelLabel(10, 'spell-list', 3)).toBe('Pact Magic 3rd Level');
    expect(getSpellLevelLabel(10, 'spell-slots', 3)).toBe('Pact Magic 3rd lvl');
    expect(() => getSpellLevelLabel(11, 'spell-list')).toThrow('Invalid spell level: 11');
  });
});
