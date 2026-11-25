import { describe, expect, it } from 'vitest';
import { indexedDbCharacterStorage } from '../../features/indexedDbStorage';

describe('knownSpellsAtom', () => {
  it('persists spell values in IndexedDB storage', async () => {
    const { createStore } = await import('jotai');
    const { knownSpellsAtom } = await import('./atoms');
    const store = createStore();

    store.set(knownSpellsAtom, (spells) => {
      const updated = [...spells];
      updated[0] = [...(updated[0] ?? []), { name: 'Eldritch Blast', school: 'V', prepared: false }];
      return updated;
    });

    expect(JSON.parse(indexedDbCharacterStorage.getItem('known-spells') ?? 'null')).toEqual([
      [{ name: 'Eldritch Blast', school: 'V', prepared: false }],
    ]);
  });

});
