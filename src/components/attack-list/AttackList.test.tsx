import React from 'react';
import { Provider, createStore } from 'jotai';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AttackAtoms, optionsWeaponsOnPreviewAtom } from './atoms';
import { AttackList } from './AttackList';

describe('AttackList', () => {
  it('shows only the configured number of weapons on the preview', () => {
    const store = createStore();
    store.set(AttackAtoms, [
      { attackName: 'Sword', attackBonus: '+1', range: '5 ft', damage: '1d8', damageType: 'slashing', note: '' },
      { attackName: 'Bow', attackBonus: '+2', range: '80 ft', damage: '1d6', damageType: 'piercing', note: '' },
      { attackName: 'Axe', attackBonus: '+3', range: '5 ft', damage: '1d10', damageType: 'slashing', note: '' },
    ]);
    store.set(optionsWeaponsOnPreviewAtom, 2);
    render(<Provider store={store}><AttackList /></Provider>);

    expect(screen.getAllByDisplayValue(/^(Sword|Bow)$/)).toHaveLength(2);
    expect(screen.queryByDisplayValue('Axe')).not.toBeInTheDocument();
  });
});
