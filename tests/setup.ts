import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';

// ProseMirror queries layout rectangles while handling keyboard edits. jsdom has
// no layout engine, so provide the empty geometry values a browser normally returns.
Element.prototype.getClientRects ??= () => [] as unknown as DOMRectList;
Element.prototype.getBoundingClientRect ??= () => ({
  bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0, x: 0, y: 0,
  toJSON: () => ({}),
});
Range.prototype.getClientRects ??= () => [] as unknown as DOMRectList;
Range.prototype.getBoundingClientRect ??= () => ({
  bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0, x: 0, y: 0,
  toJSON: () => ({}),
});

afterEach(() => {
  cleanup();
  localStorage.clear();
});
