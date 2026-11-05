import React from 'react';
import { Provider, createStore } from 'jotai';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { creaturesAtom, creatureAtomsAtom, emptyCreature } from './atoms';
import { Creatures } from './Creatures';
import { Creature } from './Creature';
import { CreatureType } from './types';

// ─── helpers ──────────────────────────────────────────────────────────────────

const makeStore = (initial?: CreatureType[]) => {
  const store = createStore();
  if (initial !== undefined) {
    store.set(creaturesAtom, initial);
  }
  return store;
};

const renderCreatures = (store = makeStore()) =>
  render(
    <Provider store={store}>
      <Creatures />
    </Provider>,
  );

// ─── atoms ────────────────────────────────────────────────────────────────────

describe('creaturesAtom default state', () => {
  it('contains exactly one creature', () => {
    const store = createStore();
    const creatures = store.get(creaturesAtom);
    expect(creatures).toHaveLength(1);
  });

  it('default creature has two attack entries', () => {
    const store = createStore();
    const [creature] = store.get(creaturesAtom);
    expect(creature.attacks).toHaveLength(2);
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

    expect(JSON.parse(localStorage.getItem('creatures') ?? '[]')).toHaveLength(1);
  });

  it('removes the correct creature by index', () => {
    const c1 = { ...emptyCreature(), name: 'Wolf' };
    const c2 = { ...emptyCreature(), name: 'Goblin' };
    const store = makeStore([c1, c2]);
    renderCreatures(store);

    const removeButtons = screen.getAllByRole('button', { name: /remove creature/i });
    fireEvent.click(removeButtons[0]);

    const stored: CreatureType[] = JSON.parse(localStorage.getItem('creatures') ?? '[]');
    expect(stored).toHaveLength(1);
    expect(stored[0].name).toBe('Goblin');
  });

  it('persists added creatures to localStorage', () => {
    const store = makeStore([]);
    renderCreatures(store);

    fireEvent.click(screen.getByRole('button', { name: /add creature/i }));
    fireEvent.click(screen.getByRole('button', { name: /add creature/i }));

    expect(JSON.parse(localStorage.getItem('creatures') ?? '[]')).toHaveLength(2);
  });
});

// ─── rendering ────────────────────────────────────────────────────────────────

describe('Creatures rendering', () => {
  it('renders the Creatures heading', () => {
    renderCreatures();
    expect(screen.getByRole('heading', { name: /creatures/i })).toBeInTheDocument();
  });

  it('renders the default creature immediately', () => {
    renderCreatures();
    // The remove button should be present for the default creature
    expect(screen.getByRole('button', { name: /remove creature/i })).toBeInTheDocument();
  });
});

// ─── Creature card: ability scores ────────────────────────────────────────────

describe('Creature ability scores', () => {
  it('displays ability score inputs with correct initial values', () => {
    // Use values that don't collide with any default stat (speed=30, armorClass=10, etc.)
    const creature = { ...emptyCreature(), str: 18, dex: 14 };
    const store = makeStore([creature]);
    render(
      <Provider store={store}>
        <Creatures />
      </Provider>,
    );

    expect(screen.getByDisplayValue('18')).toBeInTheDocument();
    expect(screen.getByDisplayValue('14')).toBeInTheDocument();
  });

  it('updates a single ability score and leaves others untouched', () => {
    // str=13 is unique — no default stat uses 13
    const creature = { ...emptyCreature(), str: 13, dex: 15 };
    const store = makeStore([creature]);
    render(
      <Provider store={store}>
        <Creatures />
      </Provider>,
    );

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
    render(
      <Provider store={store}>
        <Creatures />
      </Provider>,
    );

    expect(screen.getByDisplayValue('33')).toBeInTheDocument();
    expect(screen.getByDisplayValue('45')).toBeInTheDocument();
    expect(screen.getByDisplayValue('7')).toBeInTheDocument();
  });
});

// ─── Creature card: saving throws ─────────────────────────────────────────────

describe('Creature saving throws', () => {
  it('renders saving throw inputs', () => {
    const creature = {
      ...emptyCreature(),
      savingThrows: { str: '+3', dex: '', con: '', int: '', wis: '', cha: '' },
    };
    const store = makeStore([creature]);
    render(
      <Provider store={store}>
        <Creatures />
      </Provider>,
    );

    expect(screen.getByDisplayValue('+3')).toBeInTheDocument();
  });

  it('updates a saving throw correctly', () => {
    const store = makeStore([emptyCreature()]);
    render(
      <Provider store={store}>
        <Creatures />
      </Provider>,
    );

    // Find the STR save placeholder input
    const strSaveInput = screen.getByPlaceholderText('STR save');
    fireEvent.change(strSaveInput, { target: { value: '+5' } });

    expect(screen.getByDisplayValue('+5')).toBeInTheDocument();
  });
});

// ─── Creature card: attacks ────────────────────────────────────────────────────

describe('Creature attacks', () => {
  it('renders two attack rows by default', () => {
    renderCreatures();
    expect(screen.getByRole('heading', { name: /attacks/i })).toBeInTheDocument();
    // Each attack row has "Add attack" button visible only once at top
    expect(screen.getByRole('button', { name: /add attack/i })).toBeInTheDocument();
  });

  it('adds an attack when the button is clicked', () => {
    const store = makeStore([emptyCreature()]);
    renderCreatures(store);

    const before = store.get(creaturesAtom)[0].attacks.length;
    fireEvent.click(screen.getByRole('button', { name: /add attack/i }));

    expect(store.get(creaturesAtom)[0].attacks).toHaveLength(before + 1);
  });

  it('removes an attack by index', () => {
    const attack1 = { attackName: 'Bite', range: '5ft', toHit: '+5', damage: '1d6', damageType: 'piercing' };
    const creature = { ...emptyCreature(), attacks: [attack1] };
    const store = makeStore([creature]);
    renderCreatures(store);

    fireEvent.click(screen.getByRole('button', { name: /remove bite/i }));

    expect(store.get(creaturesAtom)[0].attacks).toHaveLength(0);
  });

  it('updates an attack field', () => {
    const store = makeStore([emptyCreature()]);
    renderCreatures(store);

    const nameInputs = screen.getAllByPlaceholderText('Attack name');
    fireEvent.change(nameInputs[0], { target: { value: 'Claw' } });

    expect(store.get(creaturesAtom)[0].attacks[0].attackName).toBe('Claw');
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
    const nameInputs = screen.getAllByPlaceholderText('Creature name');
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

    fireEvent.change(screen.getByDisplayValue('13'), { target: { value: '20' } });

    const creatures = store.get(creaturesAtom);
    expect(creatures[0].str).toBe(20);
    expect(creatures[1].str).toBe(17);
  });
});
