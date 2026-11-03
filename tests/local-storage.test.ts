import { createStore } from 'jotai';
import { describe, expect, it, vi } from 'vitest';
import { AttackAtoms, optionsWeaponsOnPreviewAtom } from '../src/components/attack-list/atoms';
import { exportLocalStorageToJSON, importJSONFileToLocalStorage } from '../src/features/utils';

describe('localStorage persistence', () => {
  const makeImportFile = (content: string) => ({ text: async () => content }) as File;
  it('persists the weapons preview option under its options key', () => {
    const store = createStore();

    store.set(optionsWeaponsOnPreviewAtom, 4);

    expect(localStorage.getItem('options_weapons-on-preview')).toBe('4');
  });

  it('persists weapon records as JSON', () => {
    const store = createStore();
    const weapon = {
      attackBonus: '+5',
      damageType: 'slashing',
      damage: '1d8+3',
      attackName: 'Longsword',
      range: '5 ft',
      note: '',
    };

    store.set(AttackAtoms, [weapon]);

    expect(JSON.parse(localStorage.getItem('attacks-list') ?? 'null')).toEqual([weapon]);
  });

  it('imports string values into localStorage', async () => {
    const reloadMock = vi.fn();
    await importJSONFileToLocalStorage(
      makeImportFile(JSON.stringify({ name: 'Aria', notes: '<p>Ready</p>' })),
      reloadMock
    );

    expect(localStorage.getItem('name')).toBe('Aria');
    expect(localStorage.getItem('notes')).toBe('<p>Ready</p>');
    expect(reloadMock).toHaveBeenCalledOnce();
  });

  it('rejects unsupported import values and reports the error', async () => {
    const alertMock = vi.fn();
    const errorMock = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    vi.spyOn(window, 'alert').mockImplementation(alertMock);

    await importJSONFileToLocalStorage(makeImportFile(JSON.stringify({ level: 3 })));

    expect(alertMock).toHaveBeenCalledWith(expect.stringContaining('unsupported format'));
    expect(errorMock).toHaveBeenCalledOnce();
    errorMock.mockRestore();
    vi.unstubAllGlobals();
  });

  it('starts a JSON download when exporting the character', () => {
    localStorage.setItem('name', 'Aria');
    const createObjectURL = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:character');
    const revokeObjectURL = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => undefined);

    exportLocalStorageToJSON();

    expect(createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
    expect(click).toHaveBeenCalledOnce();
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:character');
    createObjectURL.mockRestore();
    revokeObjectURL.mockRestore();
    click.mockRestore();
  });
});
