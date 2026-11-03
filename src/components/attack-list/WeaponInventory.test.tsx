import React from 'react';
import { Provider, createStore } from 'jotai';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AttackAtoms } from './atoms';
import { WeaponInventory } from './WeaponInventory';

describe('WeaponInventory', () => {
  it('adds and removes weapon records and persists the list', () => {
    const store = createStore();
    store.set(AttackAtoms, [{ attackName: 'Dagger', attackBonus: '+4', range: '20 ft', damage: '1d4', damageType: 'piercing', note: '' }]);
    render(<Provider store={store}><WeaponInventory /></Provider>);

    fireEvent.click(screen.getByRole('button', { name: /add weapon/i }));
    expect(JSON.parse(localStorage.getItem('attacks-list') ?? '[]')).toHaveLength(2);

    fireEvent.click(screen.getByRole('button', { name: 'Remove Dagger' }));
    expect(JSON.parse(localStorage.getItem('attacks-list') ?? '[]')).toHaveLength(1);
    expect(JSON.parse(localStorage.getItem('attacks-list') ?? '[]')[0].attackName).toBe('');
  });
});
