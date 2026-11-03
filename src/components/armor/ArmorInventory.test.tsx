import React from 'react';
import { Provider, createStore } from 'jotai';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { ArmorAtoms } from './atoms';
import { ArmorInventory } from './ArmorItem';

describe('ArmorInventory', () => {
  beforeEach(() => localStorage.clear());

  it('starts with one armor item and persists edits to its fields', () => {
    const store = createStore();
    render(
      <Provider store={store}>
        <ArmorInventory />
      </Provider>
    );

    expect(screen.getByRole('heading', { name: 'Armor' })).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText('Armor name')).toHaveLength(1);

    fireEvent.mouseDown(screen.getByRole('combobox', { name: /armor type/i }));
    fireEvent.click(screen.getByRole('option', { name: 'Light' }));
    fireEvent.change(screen.getByPlaceholderText('Armor name'), { target: { value: 'Studded Leather' } });
    fireEvent.change(screen.getByPlaceholderText('Defense'), { target: { value: '12 + Dex' } });
    fireEvent.change(screen.getByPlaceholderText('Armor description'), { target: { value: 'A dark leather jacket' } });
    fireEvent.click(screen.getByRole('checkbox', { name: /proficient/i }));

    expect(JSON.parse(localStorage.getItem('armor-items') ?? '[]')[0]).toMatchObject({
      category: 'Light',
      name: 'Studded Leather',
      defense: '12 + Dex',
      description: 'A dark leather jacket',
      proficient: true,
    });
  });

  it('adds and removes armor records', () => {
    const store = createStore();
    store.set(ArmorAtoms, [{ category: 'Heavy', name: 'Plate', defense: '18', description: '', proficient: true }]);
    render(
      <Provider store={store}>
        <ArmorInventory />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /add armor/i }));
    expect(JSON.parse(localStorage.getItem('armor-items') ?? '[]')).toHaveLength(2);

    fireEvent.click(screen.getByRole('button', { name: 'Remove Plate' }));
    expect(JSON.parse(localStorage.getItem('armor-items') ?? '[]')).toHaveLength(1);
    expect(JSON.parse(localStorage.getItem('armor-items') ?? '[]')[0].name).toBe('');
  });
});
