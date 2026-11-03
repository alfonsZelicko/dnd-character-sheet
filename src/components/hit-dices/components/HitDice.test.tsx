import React from 'react';
import { Provider, atom, createStore } from 'jotai';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HitDice } from './HitDice';

describe('HitDice', () => {
  it('lets the player manually edit the level and spent dice count', () => {
    const hitDiceAtom = atom({ die: 'd8' as const, level: 2, usage: 1 });
    const store = createStore();
    render(<Provider store={store}><HitDice hitDiceAtom={hitDiceAtom} /></Provider>);
    const levelInput = screen.getByDisplayValue('2');
    const usageInput = screen.getByDisplayValue('1');

    fireEvent.change(levelInput, { target: { name: 'level', value: '3' } });
    fireEvent.change(usageInput, { target: { name: 'usage', value: '2' } });

    expect(store.get(hitDiceAtom)).toMatchObject({ die: 'd8', level: '3', usage: '2' });
  });
});
