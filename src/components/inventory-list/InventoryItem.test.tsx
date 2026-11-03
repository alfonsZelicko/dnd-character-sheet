import React from 'react';
import { Provider, createStore } from 'jotai';
import { fireEvent, render, screen } from '@testing-library/react';
import { atom } from 'jotai';
import { describe, expect, it } from 'vitest';
import { InventoryItem } from './InventoryItem';

describe('InventoryItem', () => {
  it('updates the item name and quantity in its atom', () => {
    const itemAtom = atom({ name: 'Rope', quantity: 1 });
    const store = createStore();
    render(<Provider store={store}><InventoryItem item={itemAtom} /></Provider>);

    fireEvent.change(screen.getByDisplayValue('Rope'), { target: { value: 'Silk rope', name: 'name' } });
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '3', name: 'quantity' } });

    expect(store.get(itemAtom)).toEqual({ name: 'Silk rope', quantity: '3' });
  });
});
