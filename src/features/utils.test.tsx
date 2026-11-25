import React from 'react';
import { createStore, Provider, useAtomValue } from 'jotai';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { indexedDbCharacterStorage, initializeIndexedDbStorage } from './indexedDbStorage';
import { importCharacterBackupData } from './utils';
import { characterDescriptionAtom } from '../components';
import { MagicItemAtoms } from '../components/magic-items/atoms';
import { InventoryNotesAtom } from '../pages';

describe('IndexedDB character import', () => {
  it('imports every JSON value, including rich text and embedded creature descriptions', async () => {
    await initializeIndexedDbStorage();
    const creatures = [
      {
        id: 'imp',
        name: 'Imp',
        traits: '<p><strong>Fiendish</strong> description</p>',
        portrait: 'data:image/png;base64,aW1w',
      },
    ];
    const backup = {
      format: 'dnd-character-sheet',
      appVersion: '0.1.0',
      schemaVersion: 2,
      character: {
        'character-description': JSON.stringify('<p>description</p>'),
        notes: JSON.stringify(['<p>small note</p>']),
        featsAtom: JSON.stringify(['<p>feat description</p>']),
        'inventory-notes': JSON.stringify('<p>inventory note</p>'),
        'magic-item-atoms': JSON.stringify([
          { name: 'Ring of Testing', description: '<p>magic item note</p>', attunement: 'attuned' },
        ]),
        creatures: JSON.stringify(creatures),
        'character-picture': 'data:image/png;base64,Y2hhcmFjdGVy',
      },
    };

    await importCharacterBackupData(JSON.stringify(backup));

    for (const [key, value] of Object.entries(backup.character)) {
      expect(indexedDbCharacterStorage.getItem(key)).toBe(value);
    }
    expect(indexedDbCharacterStorage.getItem('character-data-schema-version')).toBe('2');
    expect(localStorage.length).toBe(0);

    const store = createStore();
    const NotesValues = () => (
      <>
        <output data-testid="character-description">{useAtomValue(characterDescriptionAtom)}</output>
        <output data-testid="inventory-notes">{useAtomValue(InventoryNotesAtom)}</output>
        <output data-testid="magic-items">{JSON.stringify(useAtomValue(MagicItemAtoms))}</output>
      </>
    );
    render(
      <Provider store={store}>
        <NotesValues />
      </Provider>
    );
    expect(await screen.findByTestId('character-description')).toHaveTextContent('<p>description</p>');
    expect(await screen.findByTestId('inventory-notes')).toHaveTextContent('<p>inventory note</p>');
    expect(await screen.findByTestId('magic-items')).toHaveTextContent('<p>magic item note</p>');
  });
});
