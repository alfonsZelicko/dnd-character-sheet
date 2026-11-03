import { APP_VERSION } from './version';

export const CHARACTER_DATA_SCHEMA_VERSION = 1;
const schemaVersionStorageKey = 'character-data-schema-version';
const backupFormat = 'dnd-character-sheet';

export type CharacterData = Record<string, string>;

export type CharacterBackup = {
  format: typeof backupFormat;
  appVersion: string;
  schemaVersion: number;
  data: CharacterData;
};

type MigratedCharacterData = Record<string, string | null>;
type Migration = (data: MigratedCharacterData) => MigratedCharacterData;

// Keep one migration per source version. When schema v2 is introduced, add a
// 1 -> 2 migration here; backups and local data then upgrade one step at a time.
const migrations: Record<number, Migration> = {
  0: (data) => data,
};

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

export function migrateLocalStorage(storage: Storage): void {
  const savedVersion = storage.getItem(schemaVersionStorageKey);
  const sourceVersion = savedVersion === null ? 0 : Number(savedVersion);
  const currentData = Object.fromEntries(
    Array.from({ length: storage.length }, (_, index) => storage.key(index))
      .filter((key): key is string => key !== null && key !== schemaVersionStorageKey)
      .map((key) => [key, storage.getItem(key) ?? ''])
  );
  const migratedData = migrateCharacterData(currentData, sourceVersion);

  for (const [key, value] of Object.entries(migratedData)) {
    if (value === null) storage.removeItem(key);
    else storage.setItem(key, value);
  }
  storage.setItem(schemaVersionStorageKey, String(CHARACTER_DATA_SCHEMA_VERSION));
}

export function createCharacterBackup(storage: Storage = localStorage): CharacterBackup {
  const data = Object.fromEntries(
    Array.from({ length: storage.length }, (_, index) => storage.key(index))
      .filter((key): key is string => key !== null && key !== schemaVersionStorageKey)
      .map((key) => [key, storage.getItem(key) ?? ''])
  );

  return {
    format: backupFormat,
    appVersion: APP_VERSION,
    schemaVersion: CHARACTER_DATA_SCHEMA_VERSION,
    data,
  };
}

export function parseCharacterBackup(json: string): MigratedCharacterData {
  const parsed: unknown = JSON.parse(json);
  if (!isRecord(parsed)) throw new Error('The JSON file must contain a character backup object.');

  // Backups made before the versioned envelope were flat localStorage maps.
  if (parsed.format !== backupFormat) {
    return migrateCharacterData(validateCharacterData(parsed), 0);
  }

  if (typeof parsed.appVersion !== 'string' || !Number.isInteger(parsed.schemaVersion)) {
    throw new Error('The character backup is missing valid version information.');
  }

  const data = validateCharacterData(parsed.data);
  return migrateCharacterData(data, parsed.schemaVersion as number);
}

export function writeCharacterData(storage: Storage, data: MigratedCharacterData): void {
  for (const [key, value] of Object.entries(data)) {
    if (value === null) storage.removeItem(key);
    else storage.setItem(key, value);
  }
  storage.setItem(schemaVersionStorageKey, String(CHARACTER_DATA_SCHEMA_VERSION));
}
