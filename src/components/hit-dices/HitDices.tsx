import React, { useCallback } from 'react';
import { useSetAtom } from 'jotai';
import { ResourceCounter, ResourceCounterComponentProps } from '../shared';
import { RestType } from '../features/types';
import { hitDicesAtom } from './atoms';
import { DiceType, HitDiceType } from './types';
import { RestControls, RestEvent, useRestSubscription } from '../rest-controls';

const hitDiceOptions: { key: DiceType; label: string }[] = [
  { key: 'd6', label: 'd6' },
  { key: 'd8', label: 'd8' },
  { key: 'd10', label: 'd10' },
  { key: 'd12', label: 'd12' },
];

const getKey = (hitDice: HitDiceType) => hitDice.die;
const getLabel = (hitDice: HitDiceType) => hitDice.die;
const createHitDice = (option: { key: string; label: string }): HitDiceType => ({
  die: option.key as DiceType,
  max: 1,
  usage: 0,
});

export const HitDices = ({ restMode = 'global', showHeader = true }: ResourceCounterComponentProps) => {
  const setHitDices = useSetAtom(hitDicesAtom);
  const resetHitDices = useCallback(() => {
    setHitDices((items) => items.map((item) => ({ ...item, usage: item.max })));
  }, [setHitDices]);
  const handleRest = useCallback(
    (event: RestEvent) => {
      if (event === 'long-rest') resetHitDices();
    },
    [resetHitDices]
  );
  useRestSubscription(restMode, handleRest);

  return (
    <>
      <ResourceCounter
        title="Hit Dices"
        resourceLabel="Hit Dice"
        itemsAtom={hitDicesAtom}
        options={hitDiceOptions}
        getKey={getKey}
        getLabel={getLabel}
        createItem={createHitDice}
        showHeader={showHeader}
      />
      {(restMode === 'local-controls' || restMode === 'global-controls') && (
        <RestControls
          mode={restMode}
          onRest={restMode === 'local-controls' ? (type) => type === RestType.LR && resetHitDices() : undefined}
        />
      )}
    </>
  );
};
