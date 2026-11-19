import React from 'react';
import { Provider, createStore } from 'jotai';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { hitDicesAtom } from './atoms';
import { HitDices } from './HitDices';

describe('HitDices', () => {
  it('hides dice whose maximum is zero and shows active dice', () => {
    const store = createStore();
    store.set(hitDicesAtom, [
      { die: 'd6', max: 0, usage: 0 },
      { die: 'd8', max: 1, usage: 0 },
    ]);

    render(<Provider store={store}><HitDices /></Provider>);

    expect(screen.queryByDisplayValue('d6')).not.toBeInTheDocument();
    expect(screen.getByDisplayValue('d8')).toBeInTheDocument();
  });
});
