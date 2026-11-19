import React from 'react';
import { Provider, createStore } from 'jotai';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SpellSlotCounter } from './SpellSlotCounter';
import { spellSlotsAtom } from '../atoms';

describe('SpellSlotCounter', () => {
  it('hides zero-maximum spell slots, keeps cantrips as disabled infinity placeholders, and excludes them from Add', () => {
    const store = createStore();
    const slots = Array.from({ length: 11 }, () => null) as Array<{ max: number; usage: number } | null>;
    slots[0] = { max: 1, usage: 0 };
    slots[1] = { max: 0, usage: 0 };
    slots[2] = { max: 2, usage: 1 };
    slots[10] = { max: 1, usage: 0 };
    store.set(spellSlotsAtom, slots);

    render(<Provider store={store}><SpellSlotCounter /></Provider>);

    expect(screen.queryByDisplayValue('1st level spell slot')).not.toBeInTheDocument();
    const secondLevelSlot = screen.getByDisplayValue('2nd level spell slot');
    const pactMagic = screen.getByDisplayValue('Pact Magic');
    expect(secondLevelSlot).toBeInTheDocument();
    expect(pactMagic).toBeInTheDocument();
    expect(secondLevelSlot.compareDocumentPosition(pactMagic) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getAllByPlaceholderText('∞')).toHaveLength(2);
    expect(screen.getAllByPlaceholderText('∞').every((input) => (input as HTMLInputElement).disabled)).toBe(true);

    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    const dialog = screen.getByRole('dialog');
    expect(within(dialog).queryByText('Cantrip')).not.toBeInTheDocument();
    fireEvent.click(within(dialog).getByText('1st level spell slot'));
    expect(store.get(spellSlotsAtom)[1]).toEqual({ max: 1, usage: 0 });
  });
});
