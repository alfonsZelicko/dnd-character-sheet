import React from 'react';
import { createStore, Provider } from 'jotai';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { creaturesAtom, emptyCreature } from './atoms';
import { Creatures } from './Creatures';
import { CreatureType } from './types';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../utils';
import { indexedDbCharacterStorage } from '../../features/indexedDbStorage';

// ─── helpers ──────────────────────────────────────────────────────────────────

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => {
    const minWidth = Number(query.match(/min-width:\s*(\d+(?:\.\d+)?)px/)?.[1] ?? 0);
    const maxWidth = Number(query.match(/max-width:\s*(\d+(?:\.\d+)?)px/)?.[1] ?? Infinity);

    const matches = 1024 >= minWidth && 1024 <= maxWidth;

    return {
      matches,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    };
  },
});

const makeStore = (initial?: CreatureType[]) => {
  const store = createStore();
  if (initial !== undefined) {
    store.set(creaturesAtom, initial);
  }
  return store;
};

export const renderCreatures = (store = makeStore()) => {
  return render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Creatures />
      </Provider>
    </ThemeProvider>
  );
};

// ─── atoms ────────────────────────────────────────────────────────────────────

describe('creaturesAtom default state', () => {
  it('contains exactly one creature', () => {
    const store = createStore();
    const creatures = store.get(creaturesAtom);
    expect(creatures).toHaveLength(1);
  });

  it('default creature has a stable id', () => {
    const c = emptyCreature();
    expect(typeof c.id).toBe('string');
    expect(c.id.length).toBeGreaterThan(0);
    // Two separate calls produce different ids
    expect(c.id).not.toBe(emptyCreature().id);
  });
});

// ─── add / remove creatures ────────────────────────────────────────────────────

describe('Creatures add/remove', () => {
  it('adds a creature when the button is clicked', () => {
    const store = makeStore([]);
    renderCreatures(store);

    fireEvent.click(screen.getByRole('button', { name: /add creature/i }));

    expect(JSON.parse(indexedDbCharacterStorage.getItem('creatures') ?? '[]')).toHaveLength(1);
  });

  it('removes the correct creature by index', () => {
    const c1 = { ...emptyCreature(), name: 'Wolf' };
    const c2 = { ...emptyCreature(), name: 'Goblin' };
    const store = makeStore([c1, c2]);
    renderCreatures(store);

    const removeButtons = screen.getAllByRole('button', {
      name: /remove creature/i,
    });
    fireEvent.click(removeButtons[0]);

    const stored: CreatureType[] = JSON.parse(indexedDbCharacterStorage.getItem('creatures') ?? '[]');
    expect(stored).toHaveLength(1);
    expect(stored[0].name).toBe('Goblin');
  });

  it('persists added creatures to IndexedDB storage', () => {
    const store = makeStore([]);
    renderCreatures(store);

    fireEvent.click(screen.getByRole('button', { name: /add creature/i }));
    fireEvent.click(screen.getByRole('button', { name: /add creature/i }));

    expect(JSON.parse(indexedDbCharacterStorage.getItem('creatures') ?? '[]')).toHaveLength(2);
  });
});

// ─── rendering ────────────────────────────────────────────────────────────────

describe('Creatures rendering', () => {
  it('renders the Creatures heading', () => {
    renderCreatures();
    expect(screen.getByRole('heading', { name: /creatures/i })).toBeInTheDocument();
  });

  it('renders exactly one default creature immediately', () => {
    renderCreatures(makeStore([emptyCreature()]));
    expect(screen.getAllByRole('button', { name: /remove creature/i })).toHaveLength(1);
  });
});

// ─── Creature card: ability scores ────────────────────────────────────────────

describe('Creature ability scores', () => {
  it('displays ability score inputs with correct initial values', () => {
    // Use values that don't collide with any default stat (speed=30, armorClass=10, etc.)
    const creature = { ...emptyCreature(), str: 18, dex: 14 };
    const store = makeStore([creature]);
    renderCreatures(store);

    expect(screen.getByDisplayValue('18')).toBeInTheDocument();
    expect(screen.getByDisplayValue('14')).toBeInTheDocument();
  });

  it('updates a single ability score and leaves others untouched', () => {
    // str=13 is unique — no default stat uses 13
    const creature = { ...emptyCreature(), str: 13, dex: 15 };
    const store = makeStore([creature]);
    renderCreatures(store);

    const strInput = screen.getByDisplayValue('13');
    fireEvent.change(strInput, { target: { value: '20' } });

    expect(screen.getByDisplayValue('20')).toBeInTheDocument();
    expect(screen.getByDisplayValue('15')).toBeInTheDocument();
    expect(store.get(creaturesAtom)[0].str).toBe(20);
    expect(store.get(creaturesAtom)[0].dex).toBe(15);
  });
});

// ─── Creature card: HP and combat stats ───────────────────────────────────────

describe('Creature combat stats', () => {
  it('renders HP values', () => {
    // Use values that don't collide with defaults (speed=30, armorClass=10, profBonus=2, etc.)
    const creature = { ...emptyCreature(), currentHp: 33, maxHp: 45, tempHp: 7 };
    const store = makeStore([creature]);
    renderCreatures(store);

    expect(screen.getByDisplayValue('33')).toBeInTheDocument();
    expect(screen.getByDisplayValue('45')).toBeInTheDocument();
    expect(screen.getByDisplayValue('7')).toBeInTheDocument();
  });
});

// ─── independent editing: multiple creatures ──────────────────────────────────

describe('Multiple creatures independent editing', () => {
  it('editing one creature does not affect another', () => {
    const c1 = { ...emptyCreature(), name: 'Wolf' };
    const c2 = { ...emptyCreature(), name: 'Goblin' };
    const store = makeStore([c1, c2]);
    renderCreatures(store);

    // Change c1 name
    const nameInputs = screen.getAllByLabelText('Creature name');
    fireEvent.change(nameInputs[0], { target: { value: 'Dire Wolf' } });

    const creatures = store.get(creaturesAtom);
    expect(creatures[0].name).toBe('Dire Wolf');
    expect(creatures[1].name).toBe('Goblin');
  });

  it('editing one creature ability does not affect the other creature', () => {
    // Use 13/17 — unique values that don't collide with any default stat
    const c1 = { ...emptyCreature(), str: 13 };
    const c2 = { ...emptyCreature(), str: 17 };
    const store = makeStore([c1, c2]);
    renderCreatures(store);

    fireEvent.change(screen.getByDisplayValue('13'), {
      target: { value: '20' },
    });

    const creatures = store.get(creaturesAtom);
    expect(creatures[0].str).toBe(20);
    expect(creatures[1].str).toBe(17);
  });
});
