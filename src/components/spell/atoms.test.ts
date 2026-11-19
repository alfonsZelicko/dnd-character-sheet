import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('knownSpellsAtom', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads saved spells before adding another spell after a module reload', async () => {
    const { createStore } = await import('jotai');
    const { knownSpellsAtom } = await import('./atoms');
    const store = createStore();

    store.set(knownSpellsAtom, (spells) => {
      const updated = [...spells];
      updated[0] = [...(updated[0] ?? []), { name: 'Eldritch Blast', school: 'V' }];
      return updated;
    });

    // A browser refresh recreates the atom module and reads localStorage on init.
    vi.resetModules();
    const [{ knownSpellsAtom: refreshedKnownSpellsAtom }, { createStore: createRefreshedStore }] = await Promise.all([
      import('./atoms'),
      import('jotai'),
    ]);
    const refreshedStore = createRefreshedStore();
    refreshedStore.set(refreshedKnownSpellsAtom, (spells) => {
      const updated = [...spells];
      updated[1] = [...(updated[1] ?? []), { name: 'Bane', school: 'E' }];
      return updated;
    });

    expect(JSON.parse(localStorage.getItem('known-spells') ?? 'null')).toEqual([
      [{ name: 'Eldritch Blast', school: 'V' }],
      [{ name: 'Bane', school: 'E' }],
    ]);
  });

});
