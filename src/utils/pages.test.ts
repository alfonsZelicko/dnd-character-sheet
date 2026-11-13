import { describe, expect, it } from 'vitest';
import { AppPages, resolveAppPage } from './pages';

describe('resolveAppPage', () => {
  it('resolves page ids', () => {
    Object.values(AppPages).forEach((page) => {
      expect(resolveAppPage(page.id)).toBe(page.id);
    });

    expect(resolveAppPage('creatures')).toBe('creatures');
  });

  it('falls back to character preview when the page is missing or unknown', () => {
    expect(resolveAppPage(null)).toBe(AppPages.CharacterPreview.id);
    expect(resolveAppPage('ingentory')).toBe(AppPages.CharacterPreview.id);
  });
});
