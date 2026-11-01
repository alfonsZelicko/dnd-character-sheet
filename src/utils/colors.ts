import { atomWithStorage } from 'jotai/utils';

export type ThemeColors = {
  main: string;
  content: string;
  input: string;
};

export const DefaultThemeColors: ThemeColors = {
  main: '#816e5b',
  content: '#fee8c6',
  input: 'rgba(0,0,0,0.7)',
};

export const themeColorsAtom = atomWithStorage<ThemeColors>('theme-colors', DefaultThemeColors);

export const MainColor = 'var(--app-main-color, #816e5b)';
export const MainContentColor = 'var(--app-content-color, #fee8c6)';
export const InputColor = 'var(--app-input-color, rgba(0,0,0,0.7))';
