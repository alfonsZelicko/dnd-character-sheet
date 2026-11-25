import { atomWithStorage as jotaiAtomWithStorage } from 'jotai/utils';

type SyncStorage<Value> = {
  getItem: (key: string, initialValue: Value) => Value;
  setItem: (key: string, value: Value) => void;
  removeItem: (key: string) => void;
};

const DATABASE_NAME = 'dnd-character-sheet';
const STORE_NAME = 'values';
const UNSET = Symbol('UNSET');

const cache = new Map<string, unknown>();
const pendingMutations = new Map<string, unknown | typeof UNSET>();
let pendingClear = false;
let initialized = false;
let initPromise: Promise<void> | undefined;
let databasePromise: Promise<IDBDatabase> | undefined;
let writeQueue = Promise.resolve();

const hasIndexedDb = (): boolean => typeof indexedDB !== 'undefined';

const assertInitialized = (): void => {
  if (hasIndexedDb() && !initialized) {
    throw new Error('IndexedDB storage must be initialized before character atoms are accessed.');
  }
};

const openDatabase = (): Promise<IDBDatabase> => {
  if (databasePromise) return databasePromise;

  const opening = new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE_NAME);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

  databasePromise = opening.catch((error: unknown) => {
    databasePromise = undefined;
    throw error;
  });

  return databasePromise;
};

const enqueueWrite = (operation: () => Promise<void>, description: string): void => {
  writeQueue = writeQueue.then(operation).catch((error: unknown) => {
    console.error(`Could not persist character data${description ? ` for "${description}"` : ''}.`, error);
  });
};

const transact = async <T>(
  mode: IDBTransactionMode,
  action: (store: IDBObjectStore) => IDBRequest<T> | void
): Promise<T> => {
  const db = await openDatabase();
  return new Promise<T>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, mode);
    const request = action(tx.objectStore(STORE_NAME));
    if (request) {
      request.onerror = () => reject(request.error);
    }
    tx.oncomplete = () => resolve(request ? request.result : (undefined as T));
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
};

const persistEntry = (key: string, value: unknown): void => {
  if (!hasIndexedDb()) return;
  enqueueWrite(async () => {
    if (value === undefined) await transact('readwrite', (store) => store.delete(key));
    else await transact('readwrite', (store) => store.put(value, key));
  }, key);
};

const readAllRecords = async (): Promise<Array<[string, unknown]>> => {
  const db = await openDatabase();
  return new Promise<Array<[string, unknown]>>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const keysRequest = store.getAllKeys();
    const valuesRequest = store.getAll();

    tx.oncomplete = () => {
      const keys = keysRequest.result;
      const values = valuesRequest.result;
      resolve(keys.map((key, index) => [String(key), values[index]]));
    };
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
};

const hydrateCache = (records: Array<[string, unknown]>): void => {
  if (pendingClear) {
    cache.clear();
  } else {
    for (const [key, value] of records) {
      if (!cache.has(key)) {
        cache.set(key, value);
      }
    }
  }

  for (const [key, value] of pendingMutations) {
    if (value === UNSET) cache.delete(key);
    else cache.set(key, value);
  }
};

const flushPendingMutationsToDb = (): void => {
  if (pendingClear) {
    pendingClear = false;
    enqueueWrite(() => transact('readwrite', (store) => store.clear()), 'all character data');
  }

  for (const [key, value] of pendingMutations) {
    persistEntry(key, value === UNSET ? undefined : value);
  }
  pendingMutations.clear();
};

const recordMutation = (key: string, value: unknown | typeof UNSET): void => {
  if (value === UNSET) cache.delete(key);
  else cache.set(key, value);

  if (hasIndexedDb() && !initialized) {
    pendingMutations.set(key, value);
    return;
  }

  persistEntry(key, value === UNSET ? undefined : value);
};

export const flushIndexedDbWrites = async (): Promise<void> => {
  await writeQueue;
};

export const initializeIndexedDbStorage = async (): Promise<void> => {
  if (initialized) return;
  if (!hasIndexedDb()) {
    initialized = true;
    return;
  }
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      const records = await readAllRecords();
      hydrateCache(records);
      initialized = true;
      flushPendingMutationsToDb();
      await flushIndexedDbWrites();
    } finally {
      initPromise = undefined;
    }
  })();

  return initPromise;
};

export const indexedDbCharacterStorage = {
  get length() {
    return cache.size;
  },
  key(index: number) {
    return Array.from(cache.keys())[index] ?? null;
  },
  getItem(key: string) {
    assertInitialized();
    const value = cache.get(key);
    return typeof value === 'string' ? value : null;
  },
  setItem(key: string, value: string) {
    recordMutation(key, value);
  },
  removeItem(key: string) {
    recordMutation(key, UNSET);
  },
  clear() {
    cache.clear();
    if (hasIndexedDb() && !initialized) {
      pendingClear = true;
      pendingMutations.clear();
      return;
    }
    if (!hasIndexedDb()) return;
    enqueueWrite(() => transact('readwrite', (store) => store.clear()), 'all character data');
  },
};

const jsonStorage: SyncStorage<unknown> = {
  getItem(key, initialValue) {
    const value = indexedDbCharacterStorage.getItem(key);
    if (value === null) return initialValue;
    try {
      return JSON.parse(value) as unknown;
    } catch {
      return initialValue;
    }
  },
  setItem(key, value) {
    indexedDbCharacterStorage.setItem(key, JSON.stringify(value));
  },
  removeItem(key) {
    indexedDbCharacterStorage.removeItem(key);
  },
};

const stringStorage: SyncStorage<string> = {
  getItem(key, initialValue) {
    const value = indexedDbCharacterStorage.getItem(key);
    return value ?? initialValue;
  },
  setItem(key, value) {
    indexedDbCharacterStorage.setItem(key, value);
  },
  removeItem(key) {
    indexedDbCharacterStorage.removeItem(key);
  },
};

export function atomWithStorage<Value>(
  key: string,
  initialValue: Value,
  storage?: SyncStorage<Value>,
  { getOnInit = initialized, ...restOptions }: { getOnInit?: boolean } = {}
) {
  const selectedStorage =
    storage ?? ((typeof initialValue === 'string' ? stringStorage : jsonStorage) as SyncStorage<Value>);
  return jotaiAtomWithStorage(key, initialValue, selectedStorage, {
    ...restOptions,
    getOnInit,
  });
}

export const blobToDataUrl = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });

export const getIndexedDbData = async (): Promise<Record<string, string>> => {
  assertInitialized();
  await flushIndexedDbWrites();
  const result: Record<string, string> = {};
  for (const [key, value] of cache) {
    if (typeof value === 'string') result[key] = value;
    else if (value instanceof Blob) result[key] = await blobToDataUrl(value);
    else if (value !== undefined) result[key] = JSON.stringify(value);
  }
  return result;
};

export const getIndexedDbValue = (key: string): unknown => {
  assertInitialized();
  return cache.get(key);
};

export const normalizeLegacyBlobValues = async (): Promise<void> => {
  if (!initialized) return;
  const blobEntries = [...cache.entries()].filter((entry): entry is [string, Blob] => entry[1] instanceof Blob);
  for (const [key, blob] of blobEntries) {
    const value = await blobToDataUrl(blob);
    cache.set(key, value);
    await transact('readwrite', (store) => store.put(value, key));
  }
};

export const setIndexedDbValue = (key: string, value: unknown): void => {
  assertInitialized();
  cache.set(key, value);
  persistEntry(key, value);
};
