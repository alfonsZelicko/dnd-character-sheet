import React from 'react';
import { atom, createStore, Provider } from 'jotai';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ImagePreview } from './ImagePreview';

describe('CharacterImage', () => {
  it('stores a resized WebP portrait as a Blob', async () => {
    const portraitAtom = atom<Blob | null>(null);
    vi.stubGlobal('createImageBitmap', vi.fn(async () => ({ width: 640, height: 480, close: vi.fn() })));
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:portrait');
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({ drawImage: vi.fn() } as any);
    vi.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation((callback) => {
      callback(new Blob(['compressed'], { type: 'image/webp' }));
    });
    const store = createStore();
    const { container } = render(
      <Provider store={store}>
        <ImagePreview atom={portraitAtom} storeAsBlob />
      </Provider>
    );
    const input = container.querySelector('input[type="file"]');
    const image = new File(['portrait'], 'portrait.png', { type: 'image/png' });

    fireEvent.change(input!, { target: { files: [image] } });

    await waitFor(() => expect(store.get(portraitAtom)).toMatchObject({ type: 'image/webp' }));
    vi.unstubAllGlobals();
  });

  it('silently ignores non-image and oversized files', () => {
    const portraitAtom = atom<Blob | null>(null);
    const store = createStore();
    const { container } = render(
      <Provider store={store}>
        <ImagePreview atom={portraitAtom} storeAsBlob />
      </Provider>
    );

    const input = container.querySelector('input[type="file"]');
    const notImage = new File(['text'], 'notes.txt', { type: 'text/plain' });
    const oversizedImage = new File([new Uint8Array(1024 * 1024 + 1)], 'large.png', { type: 'image/png' });

    fireEvent.change(input!, { target: { files: [notImage] } });
    fireEvent.change(input!, { target: { files: [oversizedImage] } });

    expect(store.get(portraitAtom)).toBeNull();
    expect(screen.getByText('Drop character portrait here')).toBeInTheDocument();
  });
});
