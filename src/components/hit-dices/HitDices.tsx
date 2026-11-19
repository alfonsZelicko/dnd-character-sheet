import React from 'react';
import { ResourceCounter } from '../shared';
import { hitDicesAtom } from './atoms';
import { DiceType, HitDiceType } from './types';

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

export const HitDices = () => (
  <ResourceCounter
    title="Hit Dices"
    itemsAtom={hitDicesAtom}
    options={hitDiceOptions}
    getKey={getKey}
    getLabel={getLabel}
    createItem={createHitDice}
  />
);
