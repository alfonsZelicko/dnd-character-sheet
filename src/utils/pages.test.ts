import { describe, expect, it } from 'vitest';
import { AppPages, resolveAppPage } from './pages';

describe('resolveAppPage', () => {
  it('keeps named page ids', () => {
    expect(resolveAppPage(AppPages.Inventory)).toBe('inventory');
    expect(resolveAppPage('creatures')).toBe('creatures');
  });

  it('falls back to character preview when the page is missing or unknown', () => {
    expect(resolveAppPage(null)).toBe(AppPages.CharacterPreview);
    expect(resolveAppPage('ingentory')).toBe(AppPages.CharacterPreview);
  });
});
