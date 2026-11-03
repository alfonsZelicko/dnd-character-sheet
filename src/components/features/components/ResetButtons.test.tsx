import React from 'react';
import { Provider, createStore } from 'jotai';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FeatureAtoms } from '../atoms';
import { RestType } from '../types';
import { ResetButtons } from './ResetButtons';

describe('ResetButtons', () => {
  it('restores available uses only for features matching the selected rest', () => {
    const store = createStore();
    store.set(FeatureAtoms, [
      { featureName: 'Pact magic', type: RestType.SR, maxUsages: 2, used: 0 },
      { featureName: 'Action surge', type: RestType.LR, maxUsages: 1, used: 0 },
    ]);
    render(<Provider store={store}><ResetButtons /></Provider>);

    fireEvent.click(screen.getByRole('button', { name: 'SR' }));

    expect(store.get(FeatureAtoms)).toEqual([
      { featureName: 'Pact magic', type: RestType.SR, maxUsages: 2, used: 2 },
      { featureName: 'Action surge', type: RestType.LR, maxUsages: 1, used: 0 },
    ]);
  });
});
