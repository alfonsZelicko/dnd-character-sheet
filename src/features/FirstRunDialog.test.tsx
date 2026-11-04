import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FirstRunDialog } from './FirstRunDialog';
import { needsDemoCharacterSeed } from './characterData';

describe('FirstRunDialog', () => {
  it('asks new visitors and remembers when they choose a blank sheet', async () => {
    render(
      <FirstRunDialog>
        <div>Character sheet</div>
      </FirstRunDialog>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: 'Welcome to the DnD Character Sheet',
      })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Start with a blank sheet' }));

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(needsDemoCharacterSeed()).toBe(false);
  });

  it('does not ask visitors who already have character data', () => {
    localStorage.setItem('name', 'Existing character');

    render(
      <FirstRunDialog>
        <div>Character sheet</div>
      </FirstRunDialog>
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
