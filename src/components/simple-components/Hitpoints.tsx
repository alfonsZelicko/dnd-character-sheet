import { useAtom, useAtomValue } from 'jotai';
import { NumberLabelInput } from '../shared';
import React, { useCallback } from 'react';
import { currentHitPointsAtom, maxHitPointsAtom, temporaryHitPointsAtom } from './atoms';
import { removeLeadingZeros } from '../../features/utils';
import { RestEvent, useRestSubscription } from '../rest-controls';

export const TemporaryHitPoints = () => {
  const [temporaryHitPoints, setTemporaryHitPoints] = useAtom(temporaryHitPointsAtom);

  return (
    <NumberLabelInput
      NumberInputProps={{
        value: removeLeadingZeros(temporaryHitPoints),
        onChange: (e) => setTemporaryHitPoints(+e.target.value),
      }}
      label="Tmp. Hit points"
    />
  );
};

export const CurrentHitPoints = () => {
  const [currentHitPoints, setCurrentHitPoints] = useAtom(currentHitPointsAtom);
  const maxHitPoints = useAtomValue(maxHitPointsAtom);
  const handleRest = useCallback(
    (event: RestEvent) => {
      if (event === 'long-rest') setCurrentHitPoints(maxHitPoints);
    },
    [maxHitPoints, setCurrentHitPoints]
  );
  useRestSubscription('global', handleRest);

  return (
    <NumberLabelInput
      NumberInputProps={{
        value: removeLeadingZeros(currentHitPoints),
        onChange: (e) => setCurrentHitPoints(+e.target.value),
      }}
      incDecButtonType={'slider'}
      SliderProps={{
        value: currentHitPoints,
        min: 0,
        max: maxHitPoints,
        step: 1,
        onChange: (_e, value) => setCurrentHitPoints(+value),
      }}
      label="Current HP"
    />
  );
};

export const MaxHitPoints = () => {
  const [maxHitPoints, setMaxHitPoints] = useAtom(maxHitPointsAtom);

  return (
    <NumberLabelInput
      NumberInputProps={{ value: removeLeadingZeros(maxHitPoints), onChange: (e) => setMaxHitPoints(+e.target.value) }}
      label="Max Hit points"
    />
  );
};
