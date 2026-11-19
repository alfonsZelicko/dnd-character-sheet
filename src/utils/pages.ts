export const AppPages = {
  CharacterPreview: {
    id: 'character-preview',
    label: 'Character Preview',
  },
  Inventory: {
    id: 'inventory',
    label: 'Inventory',
  },
  Creatures: {
    id: 'creatures',
    label: 'Creatures',
  },
  Spells: {
    id: 'spells',
    label: 'Spells (Beta)',
  },
  Options: {
    id: 'options',
    label: 'Options',
  },
} as const;

export type AppPage = (typeof AppPages)[keyof typeof AppPages]['id'];

export const APP_PAGE_TABS = Object.values(AppPages);

export const isAppPage = (value: string | null): value is AppPage =>
  value !== null && new Set<string>(APP_PAGE_TABS.map(({ id }) => id)).has(value);

export const resolveAppPage = (value: string | null): AppPage =>
  isAppPage(value) ? value : AppPages.CharacterPreview.id;
