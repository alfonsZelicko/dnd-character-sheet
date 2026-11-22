import React, { ReactNode, useCallback } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { PrimitiveAtom } from 'jotai/vanilla/atom';
import { ResourceCounter, ResourceCounterComponentProps, ResourceCounterRow, ResourceOption } from '../../shared';
import { RestType } from '../../features/types';
import { getSpellLevelLabel } from '../utils';
import { SpellSlotCounterItem, spellSlotCounterItemsAtom, spellSlotsAtom } from '../atoms';
import { CantripSlotRow } from './CantripSlotRow';
import { RestControls, RestEvent, useRestSubscription } from '../../rest-controls';
import { selectAtom } from 'jotai/utils';

const options: ResourceOption[] = [
  {
    key: '10',
    label: 'Pact Magic',
    children: Array.from({ length: 5 }, (_, index) => index + 1).map((level) => ({
      key: String(level),
      label: `Slot Level ${level}`,
    })),
  },
  ...Array.from({ length: 9 }, (_, index) => index + 1).map((level) => ({
    key: String(level),
    label: getSpellLevelLabel(level, 'spell-slots'),
  })),
];

const getKey = (slot: SpellSlotCounterItem) => String(slot.level);
const getLabel = (slot: SpellSlotCounterItem) => getSpellLevelLabel(slot.level, 'spell-slots', slot.pactLevel);
const createSlot = (option: { key: string }, selection?: { key: string }) => ({
  level: Number(option.key),
  max: 1,
  usage: 0,
  ...(option.key === '10' ? { pactLevel: Number(selection?.key ?? 1) } : {}),
});

const PactMagicSlotRow = React.memo(function PactMagicSlotRow({
  itemAtom,
}: {
  itemAtom: PrimitiveAtom<SpellSlotCounterItem>;
}) {
  const pactLevelAtom = React.useMemo(() => selectAtom(itemAtom, (item) => item.pactLevel ?? 1), [itemAtom]);
  const pactLevel = useAtomValue(pactLevelAtom);

  return <ResourceCounterRow itemAtom={itemAtom} label={getSpellLevelLabel(10, 'spell-slots', pactLevel)} />;
});

const renderSlotRow = (
  slot: SpellSlotCounterItem,
  itemAtom: Parameters<typeof ResourceCounterRow<SpellSlotCounterItem>>[0]['itemAtom'],
  showCantrips: boolean
) => {
  if (slot.level === 0) return showCantrips ? <CantripSlotRow key={slot.level} /> : null;
  if (slot.level === 10) return <PactMagicSlotRow key={slot.level} itemAtom={itemAtom} />;
  return <ResourceCounterRow key={slot.level} itemAtom={itemAtom} label={getLabel(slot)} />;
};

type SpellSlotCounterProps = ResourceCounterComponentProps & { showCantrips?: boolean; children?: ReactNode };

export const SpellSlotCounter = ({
  restMode = 'global',
  headerMode = 'show',
  showCantrips = true,
  display = 'counter',
  children,
}: SpellSlotCounterProps) => {
  const setSpellSlots = useSetAtom(spellSlotsAtom);
  const resetSpellSlots = useCallback(
    (restType: RestType) => {
      setSpellSlots((slots) =>
        slots.map((slot, level) => {
          if (!slot) return slot;
          if (restType === RestType.LR && level >= 1 && level <= 9) return { ...slot, usage: slot.max };
          if (restType === RestType.SR && level === 10) return { ...slot, usage: slot.max };
          return slot;
        })
      );
    },
    [setSpellSlots]
  );
  const handleRest = useCallback(
    (event: RestEvent) => {
      if (event === 'long-rest') resetSpellSlots(RestType.LR);
      if (event === 'short-rest') resetSpellSlots(RestType.SR);
    },
    [resetSpellSlots]
  );
  useRestSubscription(restMode, handleRest);
  const renderRow = useCallback(
    (
      slot: SpellSlotCounterItem,
      itemAtom: Parameters<typeof ResourceCounterRow<SpellSlotCounterItem>>[0]['itemAtom']
    ) => {
      if (display === 'usage-icons') return slot.level === 0 ? null : undefined;
      return renderSlotRow(slot, itemAtom, showCantrips);
    },
    [display, showCantrips]
  );

  return (
    <>
      <ResourceCounter
        title="Spell Slots"
        resourceLabel="Spell Slot"
        itemsAtom={spellSlotCounterItemsAtom}
        options={options}
        getKey={getKey}
        getLabel={getLabel}
        createItem={createSlot}
        renderRow={renderRow}
        showHeader={headerMode}
        display={display}
      >
        {children}
      </ResourceCounter>
      {(restMode === 'local-controls' || restMode === 'global-controls') && (
        <RestControls mode={restMode} onRest={restMode === 'local-controls' ? resetSpellSlots : undefined} />
      )}
    </>
  );
};
