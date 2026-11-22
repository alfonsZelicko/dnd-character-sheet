# Project instructions

These instructions apply to the entire repository.

## Project map

- `src/App.tsx` sets up the theme, global styles, routing, and first-run flow.
- `src/pages/layout/MainContainer.tsx` composes the main tabs. Page implementations live in `src/pages/` (preview, inventory, spells, creatures, options, and shared layout).
- `src/components/` contains reusable character-sheet UI, organized by feature.
- `src/features/` contains cross-cutting character-data persistence, import/export, defaults, and first-run behavior.
- `src/utils/` contains navigation, theme/color helpers, and shared hooks.
- `src/data/spells/` contains generated, gitignored spell data populated by `dev-utils/sync-spells.ts`.
- `tests/` contains app-wide tests. Feature and component tests usually live next to the code they cover.

For page navigation, check `src/utils/pages.ts` and `src/pages/layout/MainContainer.tsx`. For data import/export or local-storage behavior, start with `src/features/characterData.ts` and its tests.

## Component file structure

- Put new component-specific types and prop types in the nearest relevant `types.ts`, not in the component `.tsx` file. Add `types.ts` to the component folder if needed; put shared types in the nearest common component folder.
- Keep Jotai atoms colocated in the same feature folder as the stateful components that use them.
- Put non-trivial component styles, including multi-property MUI `sx` objects, in a nearby `styles.ts` and import named style constants. Keep small one-off styles inline when extracting them would make the code harder to follow.
- Colocate `styles.ts` with the component when the styles are local to that component. When sibling components share styles, keep them in the nearest common folder, as spell components do in `src/components/spell/styles.ts`.
- Follow the existing folder conventions and avoid creating extra type or style files when the appropriate `types.ts` or `styles.ts` already exists.

## Persisted character data

- Feature state is commonly stored with Jotai `atomWithStorage`. Treat storage keys as durable identifiers; preserve existing keys when changing component implementations.
- Character exports and full backups are assembled in `src/features/characterData.ts`. New application preferences must use the `options_` key prefix (or be added to its `optionKeys` set) so they remain in the backup's options section.
- Adding a storage key or an optional object field does not require a schema migration. Missing object fields are `undefined`; use `storedOrDefault` from `src/features/storedDefaults.ts` where a feature needs a default.
- If a stored key is renamed/removed or its value shape becomes incompatible, increment `CHARACTER_DATA_SCHEMA_VERSION` and add the next sequential migration in `src/features/characterData.ts`. Keep old migrations intact and cover migration behavior with tests.
- Preserve support for older flat exports and earlier versioned backup formats when changing import/export behavior.

## Checks and generated files

- Run focused Vitest tests with `pnpm exec vitest run path/to/file.test.tsx`, affected tests with `pnpm test:changed`, or the full suite with `pnpm test:run`.
- Run `pnpm exec tsc --noEmit` to verify TypeScript types.
- Run `pnpm lint` to check ESLint rules (note: `eslint-plugin-sort-keys-fix` and `eslint-plugin-unused-imports` are active).
- `pnpm build` runs `prebuild`, which invokes `pnpm sync:spells` (minimal spell data; use `pnpm sync:spells:full` for complete data) before Vite. Never hand-edit files under `src/data/spells/`.
- The package manager is pnpm (`pnpm@10.23.0`).