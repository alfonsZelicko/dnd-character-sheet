import React from 'react';
import { Provider, createStore, atom } from 'jotai';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Notes } from './Notes';

describe('Notes', () => {
  it('renders existing rich text as an editable editor', async () => {
    const notesAtom = atom('<p><strong>Remember this</strong></p>');
    const store = createStore();
    render(<Provider store={store}><Notes atom={notesAtom} aria-label="Character notes" /></Provider>);

    const editor = await screen.findByRole('textbox', { name: 'Character notes' });
    expect(editor).toHaveAttribute('contenteditable', 'true');
    expect(editor.innerHTML).toContain('<strong>Remember this</strong>');
  });
});
