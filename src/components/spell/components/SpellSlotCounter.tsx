import React from 'react';
import { ResourceCounter, ResourceCounterRow } from '../../shared';
import { getSpellLevelLabel } from '../utils';
import { spellSlotCounterItemsAtom, SpellSlotCounterItem } from '../atoms';
import { CantripSlotRow } from './CantripSlotRow';

const options = Array.from({ length: 10 }, (_, index) => index + 1).map((level) => ({
  key: String(level),
  label: getSpellLevelLabel(level, 'spell-slots'),
}));

const getKey = (slot: SpellSlotCounterItem) => String(slot.level);
const getLabel = (slot: SpellSlotCounterItem) => getSpellLevelLabel(slot.level, 'spell-slots');
const createSlot = (option: { key: string }) => ({
  level: Number(option.key),
  max: 1,
  usage: 0,
});

const renderSlotRow = (slot: SpellSlotCounterItem, itemAtom: Parameters<typeof ResourceCounterRow<SpellSlotCounterItem>>[0]['itemAtom']) => {
  if (slot.level === 0) return <CantripSlotRow key={slot.level} />;
  return <ResourceCounterRow key={slot.level} itemAtom={itemAtom} label={getLabel(slot)} />;
};

export const SpellSlotCounter = () => (
  <ResourceCounter
    title="Spell Slots"
    itemsAtom={spellSlotCounterItemsAtom}
    options={options}
    getKey={getKey}
    getLabel={getLabel}
    createItem={createSlot}
    renderRow={renderSlotRow}
  />
);
