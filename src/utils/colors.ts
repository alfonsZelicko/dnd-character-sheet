import { atomWithStorage } from 'jotai/utils';

export type ThemeColors = {
  main: string;
  content: string;
  input: string;
};

export const DefaultThemeColors: ThemeColors = {
  main: '#443f37',
  content: '#fff9ec',
  input: '#443f37',
};

export const themeColorsAtom = atomWithStorage<ThemeColors>('theme-colors', DefaultThemeColors);

export const MainColor = `var(--app-main-color, ${DefaultThemeColors})`;
export const MainContentColor = `var(--app-content-color, ${DefaultThemeColors.content})`;
export const InputColor = `var(--app-input-color, ${DefaultThemeColors.input})`;
