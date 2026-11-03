import { describe, expect, it } from 'vitest';
import {
  createCharacterBackup,
  markDemoCharacterChoice,
  needsDemoCharacterSeed,
  parseCharacterBackup,
  resetCharacterData,
  seedDemoCharacterIfEmpty,
  writeCharacterData,
} from './characterData';

const currentBackup = (character: Record<string, string>, options?: Record<string, string>) => ({
  format: 'dnd-character-sheet',
  appVersion: '0.1.0',
  schemaVersion: 2,
  character,
  ...(options === undefined ? {} : { options }),
});

describe('character backup data', () => {
  it('exports character data separately from app options', () => {
    localStorage.setItem('name', 'Mira');
    localStorage.setItem('theme-colors', '{"main":"#123456"}');
    localStorage.setItem('options_weapons-on-preview', '3');

    expect(createCharacterBackup()).toMatchObject({
      character: { name: 'Mira' },
      options: { 'theme-colors': '{"main":"#123456"}', 'options_weapons-on-preview': '3' },
    });
    expect(createCharacterBackup(localStorage, false)).toMatchObject({ character: { name: 'Mira' } });
    expect(createCharacterBackup(localStorage, false)).not.toHaveProperty('options');
  });

  it('keeps support for legacy flat exports and schema v1 backups', () => {
    expect(parseCharacterBackup(JSON.stringify({ name: 'Legacy', 'theme-colors': '{}' }))).toEqual({
      character: { name: 'Legacy' },
      options: { 'theme-colors': '{}' },
    });

    expect(
      parseCharacterBackup(
        JSON.stringify({
          format: 'dnd-character-sheet',
          appVersion: '0.1.0',
          schemaVersion: 1,
          data: { name: 'Old backup', 'showIncDecButtons': 'true' },
        })
      )
    ).toEqual({ character: { name: 'Old backup' }, options: { showIncDecButtons: 'true' } });
  });

  it('recognizes current character-only and full backup files', () => {
    expect(parseCharacterBackup(JSON.stringify(currentBackup({ name: 'Only character' })))).toEqual({
      character: { name: 'Only character' },
    });
    expect(
      parseCharacterBackup(JSON.stringify(currentBackup({ name: 'Full backup' }, { 'theme-colors': '{}' })))
    ).toEqual({ character: { name: 'Full backup' }, options: { 'theme-colors': '{}' } });
  });

  it('replaces character data on import and preserves app options for character-only files', () => {
    localStorage.setItem('name', 'Old character');
    localStorage.setItem('features', '[]');
    localStorage.setItem('theme-colors', '{"main":"#123456"}');

    writeCharacterData(localStorage, { character: { name: 'Imported character' } });

    expect(localStorage.getItem('name')).toBe('Imported character');
    expect(localStorage.getItem('features')).toBeNull();
    expect(localStorage.getItem('theme-colors')).toBe('{"main":"#123456"}');
  });

  it('replaces options as well when importing a full backup', () => {
    localStorage.setItem('name', 'Old character');
    localStorage.setItem('theme-colors', '{"main":"old"}');
    localStorage.setItem('showIncDecButtons', 'true');

    writeCharacterData(localStorage, {
      character: { name: 'Imported character' },
      options: { 'theme-colors': '{"main":"new"}' },
    });

    expect(localStorage.getItem('name')).toBe('Imported character');
    expect(localStorage.getItem('theme-colors')).toBe('{"main":"new"}');
    expect(localStorage.getItem('showIncDecButtons')).toBeNull();
  });

  it('resets character data while retaining options', () => {
    localStorage.setItem('name', 'Mira');
    localStorage.setItem('attacks-list', '[]');
    localStorage.setItem('options_weapons-on-preview', '4');
    localStorage.setItem('theme-colors', '{}');

    resetCharacterData();

    expect(localStorage.getItem('name')).toBeNull();
    expect(localStorage.getItem('attacks-list')).toBeNull();
    expect(localStorage.getItem('options_weapons-on-preview')).toBe('4');
    expect(localStorage.getItem('theme-colors')).toBe('{}');
  });

  it('offers the demo only before the visitor has made a first-run choice or entered character data', () => {
    localStorage.setItem('theme-colors', '{}');
    expect(needsDemoCharacterSeed()).toBe(true);

    markDemoCharacterChoice();
    expect(needsDemoCharacterSeed()).toBe(false);
  });

  it('seeds a demo character only into empty character storage and preserves app options', () => {
    localStorage.setItem('theme-colors', '{"main":"visitor"}');
    const demoFile = JSON.stringify(currentBackup({ name: 'Sample hero' }, { 'theme-colors': '{"main":"sample"}' }));

    expect(seedDemoCharacterIfEmpty(demoFile)).toBe(true);
    expect(localStorage.getItem('name')).toBe('Sample hero');
    expect(localStorage.getItem('theme-colors')).toBe('{"main":"visitor"}');
    expect(seedDemoCharacterIfEmpty(demoFile)).toBe(false);

    localStorage.setItem('name', 'Visitor hero');
    expect(seedDemoCharacterIfEmpty(demoFile)).toBe(false);
    expect(localStorage.getItem('name')).toBe('Visitor hero');
  });
});
