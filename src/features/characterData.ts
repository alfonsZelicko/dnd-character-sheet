import { APP_VERSION } from './version';

export const CHARACTER_DATA_SCHEMA_VERSION = 2;
const schemaVersionStorageKey = 'character-data-schema-version';
const demoSeedStorageKey = 'demo-character-seeded';
const backupFormat = 'dnd-character-sheet';

export type CharacterData = Record<string, string>;
type MigratedCharacterData = Record<string, string | null>;
export type BackupData = {
  character: MigratedCharacterData;
  options?: MigratedCharacterData;
};

export type CharacterBackup = {
  format: typeof backupFormat;
  appVersion: string;
  schemaVersion: number;
  character: CharacterData;
  options?: CharacterData;
};

type Migration = (data: MigratedCharacterData) => MigratedCharacterData;

// Keep one migration per source version. Increment the schema and add the
// matching migration whenever stored character or option keys change.
const migrations: Record<number, Migration> = {
  0: (data) => data,
  1: (data) => data,
};

const optionKeys = new Set(['theme-colors', 'showIncDecButtons', 'character-picture-mask']);

const isOptionKey = (key: string): boolean => key.startsWith('options_') || optionKeys.has(key);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const validateCharacterData = (value: unknown): CharacterData => {
  if (!isRecord(value)) {
    throw new Error('The character data must be an object of local storage values.');
  }

  const data: CharacterData = {};
  for (const [key, entry] of Object.entries(value)) {
    if (entry === null) continue;
    if (typeof entry !== 'string') {
      throw new Error('The character data contains values in an unsupported format.');
    }
    data[key] = entry;
  }

  return data;
};

export function migrateCharacterData(data: CharacterData, fromVersion: number): MigratedCharacterData {
  if (!Number.isInteger(fromVersion) || fromVersion < 0) {
    throw new Error('The character data has an invalid schema version.');
  }
  if (fromVersion > CHARACTER_DATA_SCHEMA_VERSION) {
    throw new Error(
      `This character uses data format ${fromVersion}, which is newer than this app supports (${CHARACTER_DATA_SCHEMA_VERSION}). Update the app to open it.`
    );
  }

  let migratedData: MigratedCharacterData = data;
  for (let version = fromVersion; version < CHARACTER_DATA_SCHEMA_VERSION; version += 1) {
    const migration = migrations[version];
    if (!migration) throw new Error(`No migration exists for character data format ${version}.`);
    migratedData = migration(migratedData);
  }

  return migratedData;
}

const splitData = (data: MigratedCharacterData, includeOptions = true): BackupData => {
  const character: MigratedCharacterData = {};
  const options: MigratedCharacterData = {};

  for (const [key, value] of Object.entries(data)) {
    if (key === schemaVersionStorageKey || key === demoSeedStorageKey) continue;
    (isOptionKey(key) ? options : character)[key] = value;
  }

  return { character, ...(includeOptions ? { options } : {}) };
};

export function migrateLocalStorage(storage: Storage): void {
  const savedVersion = storage.getItem(schemaVersionStorageKey);
  const sourceVersion = savedVersion === null ? 0 : Number(savedVersion);
  const currentData = Object.fromEntries(
    Array.from({ length: storage.length }, (_, index) => storage.key(index))
      .filter((key): key is string => key !== null && key !== schemaVersionStorageKey && key !== demoSeedStorageKey)
      .map((key) => [key, storage.getItem(key) ?? ''])
  );
  const migratedData = migrateCharacterData(currentData, sourceVersion);

  for (const [key, value] of Object.entries(migratedData)) {
    if (value === null) storage.removeItem(key);
    else storage.setItem(key, value);
  }
  storage.setItem(schemaVersionStorageKey, String(CHARACTER_DATA_SCHEMA_VERSION));
}

export function createCharacterBackup(storage: Storage = localStorage, includeOptions = true): CharacterBackup {
  const data = Object.fromEntries(
    Array.from({ length: storage.length }, (_, index) => storage.key(index))
      .filter((key): key is string => key !== null && key !== schemaVersionStorageKey && key !== demoSeedStorageKey)
      .map((key) => [key, storage.getItem(key) ?? ''])
  );
  const { character, options } = splitData(data);

  return {
    format: backupFormat,
    appVersion: APP_VERSION,
    schemaVersion: CHARACTER_DATA_SCHEMA_VERSION,
    character: Object.fromEntries(Object.entries(character).filter(([, value]) => value !== null)) as CharacterData,
    ...(includeOptions
      ? {
          options: Object.fromEntries(Object.entries(options ?? {}).filter(([, value]) => value !== null)) as CharacterData,
        }
      : {}),
  };
}

export function needsDemoCharacterSeed(storage: Storage = localStorage): boolean {
  if (storage.getItem(demoSeedStorageKey) === 'true') return false;

  return !Array.from({ length: storage.length }, (_, index) => storage.key(index)).some(
    (key) => key !== null && key !== schemaVersionStorageKey && key !== demoSeedStorageKey && !isOptionKey(key)
  );
}

export function seedDemoCharacterIfEmpty(json: string, storage: Storage = localStorage): boolean {
  if (!needsDemoCharacterSeed(storage)) return false;

  const { character } = parseCharacterBackup(json);
  if (Object.keys(character).length === 0) return false;

  writeCharacterData(storage, { character });
  storage.setItem(demoSeedStorageKey, 'true');
  return true;
}

export function markDemoCharacterChoice(storage: Storage = localStorage): void {
  storage.setItem(demoSeedStorageKey, 'true');
}

export function resetCharacterData(storage: Storage = localStorage): void {
  Array.from({ length: storage.length }, (_, index) => storage.key(index))
    .filter(
      (key): key is string =>
        key !== null &&
        key !== schemaVersionStorageKey &&
        key !== demoSeedStorageKey &&
        !isOptionKey(key)
    )
    .forEach((key) => storage.removeItem(key));
  // Resetting the character starts the first-run flow again, where the user
  // can choose a blank sheet or load the sample character.
  storage.removeItem(demoSeedStorageKey);
}

export function parseCharacterBackup(json: string): BackupData {
  const parsed: unknown = JSON.parse(json);
  if (!isRecord(parsed)) throw new Error('The JSON file must contain a character backup object.');

  // Backups made before the versioned envelope were flat localStorage maps.
  if (parsed.format !== backupFormat) {
    return splitData(migrateCharacterData(validateCharacterData(parsed), 0));
  }

  if (typeof parsed.appVersion !== 'string' || !Number.isInteger(parsed.schemaVersion)) {
    throw new Error('The character backup is missing valid version information.');
  }

  // Schema v1 stored all localStorage values together under `data`.
  const includesOptions = parsed.schemaVersion === 1 || parsed.options !== undefined;
  const data =
    parsed.schemaVersion === 1
      ? validateCharacterData(parsed.data)
      : {
          ...validateCharacterData(parsed.character),
          ...(parsed.options === undefined ? {} : validateCharacterData(parsed.options)),
        };
  return splitData(migrateCharacterData(data, parsed.schemaVersion as number), includesOptions);
}

export function writeCharacterData(storage: Storage, data: BackupData): void {
  const keysToReplace = Array.from({ length: storage.length }, (_, index) => storage.key(index)).filter(
    (key): key is string =>
      key !== null &&
      key !== schemaVersionStorageKey &&
      key !== demoSeedStorageKey &&
      (!isOptionKey(key) || data.options !== undefined)
  );
  keysToReplace.forEach((key) => storage.removeItem(key));

  for (const [key, value] of Object.entries({ ...data.character, ...(data.options ?? {}) })) {
    if (value === null) storage.removeItem(key);
    else storage.setItem(key, value);
  }
  storage.setItem(schemaVersionStorageKey, String(CHARACTER_DATA_SCHEMA_VERSION));
}
