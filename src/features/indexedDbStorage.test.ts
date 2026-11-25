import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { IDBFactory } from 'fake-indexeddb';
import { createStore } from 'jotai';
import { RESET } from 'jotai/utils';

type StorageModule = typeof import('./indexedDbStorage');

const seedIndexedDb = async (entries: Array<[string, unknown]>): Promise<void> => {
  await new Promise<void>((resolve, reject) => {
    const request = indexedDB.open('dnd-character-sheet', 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore('values');
    };
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction('values', 'readwrite');
      const store = tx.objectStore('values');
      for (const [key, value] of entries) {
        store.put(value, key);
      }
      tx.oncomplete = () => {
        db.close();
        resolve();
      };
      tx.onerror = () => reject(tx.error);
    };
    request.onerror = () => reject(request.error);
  });
};

const readAllFromIndexedDb = async (): Promise<Record<string, unknown>> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('dnd-character-sheet', 1);
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction('values', 'readonly');
      const store = tx.objectStore('values');
      const keysReq = store.getAllKeys();
      const valsReq = store.getAll();
      tx.oncomplete = () => {
        const out: Record<string, unknown> = {};
        keysReq.result.forEach((k, i) => {
          out[String(k)] = valsReq.result[i];
        });
        db.close();
        resolve(out);
      };
      tx.onerror = () => reject(tx.error);
    };
    request.onerror = () => reject(request.error);
  });
};

describe('indexedDbStorage', () => {
  let mod: StorageModule;

  beforeEach(async () => {
    vi.resetModules();
    vi.stubGlobal('indexedDB', new IDBFactory());
    mod = await import('./indexedDbStorage');
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  describe('initialization guards and pre-init queue', () => {
    it('throws on synchronous reads before initialization in IndexedDB mode', async () => {
      expect(() => mod.indexedDbCharacterStorage.getItem('name')).toThrow(
        'IndexedDB storage must be initialized before character atoms are accessed.'
      );
      expect(() => mod.getIndexedDbValue('name')).toThrow();
      expect(() => mod.setIndexedDbValue('name', 'Aragorn')).toThrow();
      await expect(mod.getIndexedDbData()).rejects.toThrow();
    });

    it('queues setItem, removeItem, and clear operations called before initialization', async () => {
      await seedIndexedDb([
        ['old-key', 'should-be-cleared'],
        ['another-old', 'also-cleared'],
      ]);

      mod.indexedDbCharacterStorage.setItem('temp', 'value');
      mod.indexedDbCharacterStorage.clear();
      mod.indexedDbCharacterStorage.setItem('name', 'Aragorn');
      mod.indexedDbCharacterStorage.setItem('to-remove', 'bye');
      mod.indexedDbCharacterStorage.removeItem('to-remove');

      await mod.initializeIndexedDbStorage();

      expect(mod.indexedDbCharacterStorage.length).toBe(1);
      expect(mod.indexedDbCharacterStorage.getItem('name')).toBe('Aragorn');
      expect(mod.indexedDbCharacterStorage.getItem('old-key')).toBeNull();
      expect(mod.indexedDbCharacterStorage.getItem('to-remove')).toBeNull();
      expect(await readAllFromIndexedDb()).toEqual({ name: 'Aragorn' });
    });

    it('is idempotent when initializeIndexedDbStorage is called multiple times', async () => {
      await seedIndexedDb([['name', 'Gandalf']]);
      await mod.initializeIndexedDbStorage();
      await mod.initializeIndexedDbStorage();

      expect(mod.indexedDbCharacterStorage.getItem('name')).toBe('Gandalf');
    });

    it('resets databasePromise if opening fails and succeeds on subsequent retry', async () => {
      const brokenIdb = {
        open: vi.fn(() => {
          const req: Record<string, unknown> = { error: new Error('Open failed') };
          queueMicrotask(() => {
            if (typeof req.onerror === 'function') req.onerror();
          });
          return req;
        }),
      };

      vi.stubGlobal('indexedDB', brokenIdb);
      await expect(mod.initializeIndexedDbStorage()).rejects.toThrow('Open failed');

      vi.stubGlobal('indexedDB', new IDBFactory());
      await expect(mod.initializeIndexedDbStorage()).resolves.toBeUndefined();
    });

    it('deduplicates concurrent initializeIndexedDbStorage calls', async () => {
      await seedIndexedDb([['name', 'Gandalf']]);
      const openSpy = vi.spyOn(indexedDB, 'open');

      await Promise.all([
        mod.initializeIndexedDbStorage(),
        mod.initializeIndexedDbStorage(),
        mod.initializeIndexedDbStorage(),
      ]);

      expect(openSpy).toHaveBeenCalledTimes(1);
      expect(mod.indexedDbCharacterStorage.getItem('name')).toBe('Gandalf');
    });

    it('removes pre-existing IndexedDB keys when removeItem is called before init', async () => {
      await seedIndexedDb([
        ['keep', 'yes'],
        ['delete-me', 'no'],
      ]);

      mod.indexedDbCharacterStorage.removeItem('delete-me');
      await mod.initializeIndexedDbStorage();

      expect(mod.indexedDbCharacterStorage.getItem('keep')).toBe('yes');
      expect(mod.indexedDbCharacterStorage.getItem('delete-me')).toBeNull();
      expect(await readAllFromIndexedDb()).toEqual({ keep: 'yes' });
    });

    it('returns null from getItem for non-string values while getIndexedDbValue returns raw value', async () => {
      await seedIndexedDb([['raw-object', { hp: 42 }]]);
      await mod.initializeIndexedDbStorage();

      expect(mod.indexedDbCharacterStorage.getItem('raw-object')).toBeNull();
      expect(mod.getIndexedDbValue('raw-object')).toEqual({ hp: 42 });
    });

    it('deletes entry from IndexedDB when setIndexedDbValue is called with undefined', async () => {
      await mod.initializeIndexedDbStorage();
      mod.setIndexedDbValue('temp', 'abc');
      await mod.flushIndexedDbWrites();

      mod.setIndexedDbValue('temp', undefined);
      await mod.flushIndexedDbWrites();

      expect(mod.getIndexedDbValue('temp')).toBeUndefined();
      expect(await readAllFromIndexedDb()).toEqual({});
    });
  });

  describe('IndexedDB mode', () => {
    it('hydrates cache from existing IndexedDB records on init', async () => {
      await seedIndexedDb([
        ['name', 'Legolas'],
        ['level', '5'],
      ]);

      await mod.initializeIndexedDbStorage();

      expect(mod.indexedDbCharacterStorage.length).toBe(2);
      expect(mod.indexedDbCharacterStorage.key(0)).toBe('level');
      expect(mod.indexedDbCharacterStorage.key(1)).toBe('name');
      expect(mod.indexedDbCharacterStorage.key(2)).toBeNull();
      expect(mod.indexedDbCharacterStorage.getItem('name')).toBe('Legolas');
      expect(mod.indexedDbCharacterStorage.getItem('level')).toBe('5');
      expect(mod.indexedDbCharacterStorage.getItem('missing')).toBeNull();
    });

    it('persists setItem, removeItem, and clear operations asynchronously', async () => {
      await mod.initializeIndexedDbStorage();

      mod.indexedDbCharacterStorage.setItem('name', 'Gimli');
      mod.indexedDbCharacterStorage.setItem('race', 'Dwarf');
      expect(mod.indexedDbCharacterStorage.getItem('name')).toBe('Gimli');

      await mod.flushIndexedDbWrites();
      expect(await readAllFromIndexedDb()).toEqual({ name: 'Gimli', race: 'Dwarf' });

      mod.indexedDbCharacterStorage.removeItem('race');
      await mod.flushIndexedDbWrites();
      expect(await readAllFromIndexedDb()).toEqual({ name: 'Gimli' });

      mod.indexedDbCharacterStorage.clear();
      expect(mod.indexedDbCharacterStorage.length).toBe(0);
      await mod.flushIndexedDbWrites();
      expect(await readAllFromIndexedDb()).toEqual({});
    });

    it('continues processing writeQueue even if one write fails', async () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      await mod.initializeIndexedDbStorage();

      mod.setIndexedDbValue('bad-key', () => {});
      mod.indexedDbCharacterStorage.setItem('good-key', 'survived');

      await mod.flushIndexedDbWrites();

      expect(errorSpy).toHaveBeenCalledOnce();
      expect(await readAllFromIndexedDb()).toEqual({ 'good-key': 'survived' });
    });

    it('normalizes legacy Blob values into base64 data URLs', async () => {
      const sampleBlob = new Blob(['portrait-data'], { type: 'image/webp' });
      await seedIndexedDb([['name', 'Elrond']]);

      await mod.initializeIndexedDbStorage();
      mod.setIndexedDbValue('character-picture', sampleBlob);

      await mod.normalizeLegacyBlobValues();

      const normalized = mod.indexedDbCharacterStorage.getItem('character-picture');
      expect(typeof normalized).toBe('string');
      expect(normalized).toMatch(/^data:image\/webp;base64,/);

      const persisted = await readAllFromIndexedDb();
      expect(persisted['character-picture']).toBe(normalized);
      expect(persisted.name).toBe('Elrond');
    });

    it('converts Blob to base64 data URL via blobToDataUrl', async () => {
      const sampleBlob = new Blob(['portrait-data'], { type: 'image/webp' });
      const dataUrl = await mod.blobToDataUrl(sampleBlob);

      expect(dataUrl).toMatch(/^data:image\/webp;base64,/);
    });

    it('returns all entries from getIndexedDbData and converts Blobs to data URLs', async () => {
      await mod.initializeIndexedDbStorage();
      mod.indexedDbCharacterStorage.setItem('name', 'Frodo');
      mod.setIndexedDbValue('level', 3);
      mod.setIndexedDbValue('character-picture', new Blob(['img'], { type: 'image/png' }));

      const data = await mod.getIndexedDbData();
      expect(data.name).toBe('Frodo');
      expect(data.level).toBe('3');
      expect(data['character-picture']).toMatch(/^data:image\/png;base64,/);
    });
  });

  describe('Jotai atomWithStorage integration', () => {
    it('reads initialValue when key is missing and persists JSON updates', async () => {
      await mod.initializeIndexedDbStorage();
      const store = createStore();
      const statsAtom = mod.atomWithStorage('stats', { str: 10, dex: 12 });

      expect(store.get(statsAtom)).toEqual({ str: 10, dex: 12 });

      store.set(statsAtom, { str: 16, dex: 14 });
      expect(store.get(statsAtom)).toEqual({ str: 16, dex: 14 });

      await mod.flushIndexedDbWrites();
      const persisted = await readAllFromIndexedDb();
      expect(persisted.stats).toBe(JSON.stringify({ str: 16, dex: 14 }));
    });

    it('persists plain string atoms directly without extra JSON quotes', async () => {
      await mod.initializeIndexedDbStorage();
      const store = createStore();
      const nameAtom = mod.atomWithStorage('character-name', 'Unnamed');

      expect(store.get(nameAtom)).toBe('Unnamed');

      store.set(nameAtom, 'Bilbo Baggins');
      expect(store.get(nameAtom)).toBe('Bilbo Baggins');

      await mod.flushIndexedDbWrites();
      const persisted = await readAllFromIndexedDb();
      expect(persisted['character-name']).toBe('Bilbo Baggins');
    });

    it('falls back to initialValue if stored JSON is corrupted', async () => {
      await seedIndexedDb([['corrupted', '{not-valid-json']]);
      await mod.initializeIndexedDbStorage();

      const store = createStore();
      const brokenAtom = mod.atomWithStorage('corrupted', { ok: true });

      expect(store.get(brokenAtom)).toEqual({ ok: true });
    });

    it('hydrates module-level atoms created before initialization once initialized', async () => {
      await seedIndexedDb([['character-name', 'Boromir']]);

      const nameAtom = mod.atomWithStorage('character-name', 'Default');
      await mod.initializeIndexedDbStorage();

      const store = createStore();
      expect(store.get(nameAtom)).toBe('Boromir');
    });

    it('throws when getOnInit is explicitly set to true before initialization', () => {
      const eagerAtom = mod.atomWithStorage('character-name', 'Default', undefined, { getOnInit: true });
      const store = createStore();

      expect(() => store.get(eagerAtom)).toThrow(
        'IndexedDB storage must be initialized before character atoms are accessed.'
      );
    });

    it('supports RESET symbol and custom storage override', async () => {
      await mod.initializeIndexedDbStorage();

      const store = createStore();
      const noteAtom = mod.atomWithStorage('note', 'Initial');

      store.set(noteAtom, 'Updated');
      await mod.flushIndexedDbWrites();
      expect((await readAllFromIndexedDb()).note).toBe('Updated');

      store.set(noteAtom, RESET);
      await mod.flushIndexedDbWrites();
      expect(store.get(noteAtom)).toBe('Initial');
      expect(await readAllFromIndexedDb()).toEqual({});
    });
  });

  describe('memory-only fallback mode (when indexedDB is undefined)', () => {
    beforeEach(async () => {
      vi.resetModules();
      vi.stubGlobal('indexedDB', undefined);
      mod = await import('./indexedDbStorage');
    });

    it('allows storage operations in memory without throwing before or after init', async () => {
      mod.indexedDbCharacterStorage.setItem('pre-init', 'ok');
      await mod.initializeIndexedDbStorage();

      expect(mod.indexedDbCharacterStorage.getItem('pre-init')).toBe('ok');

      mod.indexedDbCharacterStorage.setItem('class', 'Fighter');
      expect(mod.indexedDbCharacterStorage.getItem('class')).toBe('Fighter');

      mod.indexedDbCharacterStorage.removeItem('class');
      expect(mod.indexedDbCharacterStorage.getItem('class')).toBeNull();

      mod.indexedDbCharacterStorage.clear();
      expect(mod.indexedDbCharacterStorage.length).toBe(0);
    });
  });
});
