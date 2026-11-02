import { createStore } from 'jotai';
import { describe, expect, it } from 'vitest';
import { AttackAtoms, optionsWeaponsOnPreviewAtom } from '../src/components/attack-list/atoms';

describe('localStorage persistence', () => {
  it('persists the weapons preview option under its options key', () => {
    const store = createStore();

    store.set(optionsWeaponsOnPreviewAtom, 4);

    expect(localStorage.getItem('options_weapons-on-preview')).toBe('4');
  });

  it('persists weapon records as JSON', () => {
    const store = createStore();
    const weapon = {
      attackBonus: '+5',
      damageType: 'slashing',
      damage: '1d8+3',
      attackName: 'Longsword',
      range: '5 ft',
      note: '',
    };

    store.set(AttackAtoms, [weapon]);

    expect(JSON.parse(localStorage.getItem('attacks-list') ?? 'null')).toEqual([weapon]);
  });
});
