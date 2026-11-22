import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { SetStateAction } from 'react';
import { SpellAtom } from './types';

/** Known spells grouped by spell level (0 through 9). */
// Read storage synchronously when a new Jotai store is created so the first
// update after a page refresh starts from the saved spells instead of `[]`.
export const knownSpellsAtom = atomWithStorage<SpellAtom[][]>('known-spells', [], undefined, {
  getOnInit: true,
});

export type SpellSlotResource = { max: number; usage: number; pactLevel?: number };
export type SpellSlots = Array<SpellSlotResource | null>;
export type SpellSlotCounterItem = SpellSlotResource & { level: number };

const emptySpellSlots = (): SpellSlots => {
  const slots: SpellSlots = Array.from({ length: 11 }, () => null);
  slots[0] = { max: 1, usage: 0 };
  return slots;
};

export const spellSlotsAtom = atomWithStorage<SpellSlots>('spell-slots', emptySpellSlots(), undefined, {
  getOnInit: true,
});

const getSlotCounterItems = (slots: SpellSlots): SpellSlotCounterItem[] =>
  slots.map((slot, level) => {
    if (!slot) return { level, max: 0, usage: 0 };
    return {
      level,
      max: slot.max,
      usage: slot.usage,
      ...(level === 10 && slot.pactLevel ? { pactLevel: slot.pactLevel } : {}),
    };
  });

export const spellSlotCounterItemsAtom = atom<SpellSlotCounterItem[], [SetStateAction<SpellSlotCounterItem[]>], void>(
  (get) => getSlotCounterItems(get(spellSlotsAtom)),
  (get, set, update) => {
    const currentItems = getSlotCounterItems(get(spellSlotsAtom));
    const nextItems = typeof update === 'function' ? update(currentItems) : update;
    const nextSlots: SpellSlots = [...get(spellSlotsAtom)];

    nextItems.forEach(({ level, max, usage, pactLevel }) => {
      if (level === 0) return;
      nextSlots[level] =
        max > 0
          ? {
              max,
              usage: Math.min(max, usage),
              ...(level === 10 ? { pactLevel: pactLevel ?? nextSlots[level]?.pactLevel ?? 1 } : {}),
            }
          : null;
    });

    set(spellSlotsAtom, nextSlots);
  }
);
