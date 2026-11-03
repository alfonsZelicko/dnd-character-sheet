import React from 'react';
import { Provider, createStore } from 'jotai';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CharacterPictureAtom } from './atoms';
import { CharacterImage } from './CharacterImage';

describe('CharacterImage', () => {
  it('stores a selected image as a data URL', async () => {
    const store = createStore();
    const { container } = render(<Provider store={store}><CharacterImage /></Provider>);
    const input = container.querySelector('input[type="file"]');
    const image = new File(['portrait'], 'portrait.png', { type: 'image/png' });

    fireEvent.change(input!, { target: { files: [image] } });

    await waitFor(() => expect(store.get(CharacterPictureAtom)).toMatch(/^data:image\/png;base64,/));
  });

  it('silently ignores non-image and oversized files', () => {
    const store = createStore();
    const { container } = render(<Provider store={store}><CharacterImage /></Provider>);
    const input = container.querySelector('input[type="file"]');
    const notImage = new File(['text'], 'notes.txt', { type: 'text/plain' });
    const oversizedImage = new File([new Uint8Array(1024 * 1024 + 1)], 'large.png', { type: 'image/png' });

    fireEvent.change(input!, { target: { files: [notImage] } });
    fireEvent.change(input!, { target: { files: [oversizedImage] } });

    expect(store.get(CharacterPictureAtom)).toBeNull();
    expect(screen.getByText('Drop character portrait here')).toBeInTheDocument();
  });
});
