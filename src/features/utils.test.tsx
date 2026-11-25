import React from 'react';
import { createStore, Provider, useAtomValue } from 'jotai';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { flushIndexedDbWrites, indexedDbCharacterStorage, initializeIndexedDbStorage } from './indexedDbStorage';
import { importCharacterBackupData } from './utils';
import { Notes } from '../components/notes';

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
        notes: JSON.stringify([
          '<p><strong>First imported note</strong></p>',
          '<p>Second imported note</p>',
          '<p>Third imported note</p>',
        ]),
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

    // Match production startup: feature atoms are created after IndexedDB is ready.
    const [simpleAtoms, magicItemAtoms, { SmallInventory }, { InventoryNotesAtom }] = await Promise.all([
      import('../components/simple-components/atoms'),
      import('../components/magic-items/atoms'),
      import('../components/simple-components/SmallInventory'),
      import('../pages/inventory/atoms'),
    ]);
    const { characterDescriptionAtom, noteAtoms } = simpleAtoms;
    const { MagicItemAtoms } = magicItemAtoms;

    expect(indexedDbCharacterStorage.getItem('character-data-schema-version')).toBe('2');
    expect(localStorage.length).toBe(0);

    const store = createStore();
    const NotesValues = () => (
      <>
        <output data-testid="character-description">{useAtomValue(characterDescriptionAtom)}</output>
        <output data-testid="inventory-notes">{useAtomValue(InventoryNotesAtom)}</output>
        <output data-testid="notes-value">{JSON.stringify(useAtomValue(noteAtoms))}</output>
        <output data-testid="magic-items">{JSON.stringify(useAtomValue(MagicItemAtoms))}</output>
        <Notes atom={characterDescriptionAtom} arrayIndex={0} placeholder="Description import test" />
        <Notes atom={InventoryNotesAtom} arrayIndex={0} placeholder="Inventory import test" />
        <SmallInventory />
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
    expect(await screen.findByRole('textbox', { name: 'Description import test' })).toHaveTextContent('description');
    expect(await screen.findByRole('textbox', { name: 'Inventory import test' })).toHaveTextContent('inventory note');
    await waitFor(() => expect(screen.getByTestId('notes-value')).toHaveTextContent('First imported note'));
    await waitFor(() =>
      expect(screen.getByRole('textbox', { name: 'Notes 1' })).toHaveTextContent('First imported note')
    );
    await waitFor(async () => {
      await flushIndexedDbWrites();
      expect(indexedDbCharacterStorage.getItem('notes')).toBe(backup.character.notes);
      expect(indexedDbCharacterStorage.getItem('character-description')).toBe(
        JSON.stringify(['<p>description</p>'])
      );
      expect(indexedDbCharacterStorage.getItem('inventory-notes')).toBe(JSON.stringify(['<p>inventory note</p>']));
    });
  });
});
