import { act, render } from '@testing-library/react';
import { createStore, Provider } from 'jotai';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { knownSpellsAtom } from '../atoms';
import { SpellList } from './SpellList';

const { renderSpy } = vi.hoisted(() => ({ renderSpy: vi.fn() }));

vi.mock('./SpellListItem', async () => {
  const ReactModule = await import('react');
  return {
    SpellListItem: ReactModule.memo(({ spell }: { spell: { name: string } }) => {
      renderSpy(spell.name);
      return ReactModule.createElement('li', null, spell.name);
    }),
  };
});

describe('SpellList', () => {
  beforeEach(() => renderSpy.mockClear());

  it('renders only the newly added spell item when appending to the level', () => {
    const store = createStore();
    store.set(knownSpellsAtom, [
      [
        { name: 'Eldritch Blast', school: 'V', prepared: false },
        { name: 'Fire Bolt', school: 'V', prepared: false },
      ],
    ]);

    render(
      <Provider store={store}>
        <SpellList level={0} />
      </Provider>
    );
    renderSpy.mockClear();

    act(() => {
      store.set(knownSpellsAtom, (levels) => [[...(levels[0] ?? []), { name: 'Light', school: 'V', prepared: false }]]);
    });

    expect(renderSpy.mock.calls).toEqual([['Light']]);
  });
});
